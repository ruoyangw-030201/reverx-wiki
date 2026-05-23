from collections import defaultdict
from collections import deque
from pathlib import Path
import math

from PIL import Image
from PIL import ImageFilter


ROOT = Path(__file__).resolve().parents[1]
MAP_ROOT = ROOT / "public" / "map"
OUTPUT = ROOT / "src" / "data" / "generatedWorldMapPaths.js"
THRESHOLD = 8
SIMPLIFY_EPSILON = 2.0
MIN_AREA = 80
BOUNDARY_DILATION_PASSES = 2
MAX_REGION_RATIO = 0.92

SEGMENTS_BY_CASE = {
    1: [("left", "top")],
    2: [("top", "right")],
    3: [("left", "right")],
    4: [("right", "bottom")],
    5: [("left", "top"), ("right", "bottom")],
    6: [("top", "bottom")],
    7: [("left", "bottom")],
    8: [("bottom", "left")],
    9: [("top", "bottom")],
    10: [("top", "right"), ("bottom", "left")],
    11: [("right", "bottom")],
    12: [("left", "right")],
    13: [("top", "right")],
    14: [("left", "top")],
}


def point_line_distance(point, start, end):
    px, py = point
    ax, ay = start
    bx, by = end
    dx = bx - ax
    dy = by - ay

    if dx == 0 and dy == 0:
        return math.hypot(px - ax, py - ay)

    t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)
    t = max(0, min(1, t))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def simplify_open(points, epsilon):
    if len(points) <= 2:
        return points

    start = points[0]
    end = points[-1]
    max_distance = -1
    split_index = -1

    for index, point in enumerate(points[1:-1], 1):
        distance = point_line_distance(point, start, end)
        if distance > max_distance:
            max_distance = distance
            split_index = index

    if max_distance > epsilon:
        left = simplify_open(points[: split_index + 1], epsilon)
        right = simplify_open(points[split_index:], epsilon)
        return left[:-1] + right

    return [start, end]


def simplify_polygon(points, epsilon):
    if len(points) < 4:
        return points

    is_closed = points[0] == points[-1]
    ring = points[:-1] if is_closed else points

    if len(ring) < 4:
        return points

    cx = sum(point[0] for point in ring) / len(ring)
    cy = sum(point[1] for point in ring) / len(ring)
    split_index = max(
        range(len(ring)),
        key=lambda index: (ring[index][0] - cx) ** 2 + (ring[index][1] - cy) ** 2,
    )

    rotated = ring[split_index:] + ring[:split_index] + [ring[split_index]]
    simplified = simplify_open(rotated, epsilon)
    return simplified if simplified[0] == simplified[-1] else simplified + [simplified[0]]


def polygon_area(points):
    if len(points) < 4:
        return 0

    return abs(
        sum(
            points[index][0] * points[index + 1][1]
            - points[index + 1][0] * points[index][1]
            for index in range(len(points) - 1)
        )
        / 2
    )


def build_closed_region(alpha):
    boundary = alpha.point(lambda value: 255 if value > THRESHOLD else 0)

    for _ in range(BOUNDARY_DILATION_PASSES):
        boundary = boundary.filter(ImageFilter.MaxFilter(3))

    width, height = boundary.size
    blocked = bytearray(1 if value else 0 for value in boundary.tobytes())
    outside = bytearray(width * height)
    queue = deque()

    def enqueue(x, y):
        index = y * width + x
        if blocked[index] or outside[index]:
            return

        outside[index] = 1
        queue.append(index)

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)

    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        index = queue.popleft()
        x = index % width

        left = index - 1
        right = index + 1
        up = index - width
        down = index + width

        if x > 0 and not blocked[left] and not outside[left]:
            outside[left] = 1
            queue.append(left)

        if x < width - 1 and not blocked[right] and not outside[right]:
            outside[right] = 1
            queue.append(right)

        if index >= width and not blocked[up] and not outside[up]:
            outside[up] = 1
            queue.append(up)

        if index < width * (height - 1) and not blocked[down] and not outside[down]:
            outside[down] = 1
            queue.append(down)

    region = bytearray(width * height)
    filled_count = 0

    for index in range(width * height):
        if blocked[index] or not outside[index]:
            region[index] = 255
            filled_count += 1

    if filled_count > width * height * MAX_REGION_RATIO:
        return boundary

    return Image.frombytes("L", (width, height), bytes(region))


def trace_region(region):
    bbox = region.getbbox()

    if not bbox:
        return []

    pixels = region.load()
    width, height = region.size

    def is_inside(x, y):
        return 0 <= x < width and 0 <= y < height and pixels[x, y] > 0

    x_min, y_min, x_max, y_max = bbox
    edges = []

    for y in range(max(-1, y_min - 1), min(height, y_max) + 1):
        for x in range(max(-1, x_min - 1), min(width, x_max) + 1):
            case = (
                (1 if is_inside(x, y) else 0)
                | (2 if is_inside(x + 1, y) else 0)
                | (4 if is_inside(x + 1, y + 1) else 0)
                | (8 if is_inside(x, y + 1) else 0)
            )
            cell_points = {
                "top": (2 * x + 1, 2 * y),
                "right": (2 * x + 2, 2 * y + 1),
                "bottom": (2 * x + 1, 2 * y + 2),
                "left": (2 * x, 2 * y + 1),
            }

            for start_key, end_key in SEGMENTS_BY_CASE.get(case, []):
                edges.append((cell_points[start_key], cell_points[end_key]))

    adjacency = defaultdict(list)
    for index, (start, end) in enumerate(edges):
        adjacency[start].append((end, index))
        adjacency[end].append((start, index))

    used_edges = set()
    polygons = []

    for index, (start, end) in enumerate(edges):
        if index in used_edges:
            continue

        used_edges.add(index)
        ring = [start, end]
        previous = start
        current = end

        while True:
            next_edge = None

            for candidate, edge_index in adjacency[current]:
                if edge_index not in used_edges and candidate != previous:
                    next_edge = (candidate, edge_index)
                    break

            if next_edge is None:
                for candidate, edge_index in adjacency[current]:
                    if edge_index not in used_edges:
                        next_edge = (candidate, edge_index)
                        break

            if next_edge is None:
                break

            candidate, edge_index = next_edge
            used_edges.add(edge_index)
            previous = current
            current = candidate
            ring.append(current)

            if current == ring[0]:
                break

        polygon = [(x / 2, y / 2) for x, y in ring]
        polygon = simplify_polygon(polygon, SIMPLIFY_EPSILON)

        if polygon_area(polygon) >= MIN_AREA:
            polygons.append(polygon)

    return polygons


def trace_mask(mask_path):
    image = Image.open(mask_path).convert("RGBA")
    alpha = image.getchannel("A")

    if not alpha.getbbox():
        return []

    return trace_region(build_closed_region(alpha))


def format_number(value):
    if float(value).is_integer():
        return str(int(value))
    return f"{value:.1f}"


def polygon_to_path(points):
    if not points:
        return ""

    commands = [f"M {format_number(points[0][0])} {format_number(points[0][1])}"]
    commands.extend(f"L {format_number(x)} {format_number(y)}" for x, y in points[1:])
    return " ".join(commands) + " Z"


def format_object_key(key):
    return key if key.isidentifier() else repr(key)


def collect_paths():
    data = {}

    for map_dir in sorted(path for path in MAP_ROOT.iterdir() if path.is_dir()):
        map_key = map_dir.name
        data[map_key] = {}

        for mask_path in sorted(map_dir.glob(f"{map_key}_mask_*.png")):
            region_key = mask_path.stem.replace(f"{map_key}_mask_", "")
            polygons = trace_mask(mask_path)
            data[map_key][region_key] = [polygon_to_path(polygon) for polygon in polygons]
            print(f"{map_key}/{region_key}: {len(polygons)} path(s)")

    return data


def write_output(data):
    lines = [
        "// Generated by scripts/generate-map-paths.py. Do not edit by hand.",
        "export const generatedWorldMapPaths = {",
    ]

    for map_key, regions in data.items():
        lines.append(f"  {format_object_key(map_key)}: {{")
        for region_key, paths in regions.items():
            lines.append(f"    {format_object_key(region_key)}: [")
            for path in paths:
                lines.append(f"      {path!r},")
            lines.append("    ],")
        lines.append("  },")

    lines.append("};")
    lines.append("")
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    write_output(collect_paths())
