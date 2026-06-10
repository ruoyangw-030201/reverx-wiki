const normalizePath = (path) => path.replace(/\/$/, "") || "/";
let cleanupSidebarAnchorState = () => {};

function initSidebarCollapsibleGroups() {
  document.querySelectorAll("[data-sidebar-collapsible]").forEach((group) => {
    if (group.dataset.sidebarCollapsibleReady === "true") return;
    const toggle = group.querySelector("[data-sidebar-toggle]");
    const children = group.querySelector("[data-sidebar-children]");

    if (!(toggle instanceof HTMLButtonElement) || !(children instanceof HTMLElement)) return;
    group.dataset.sidebarCollapsibleReady = "true";

    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!isExpanded));
      children.hidden = isExpanded;
      group.classList.toggle("is-collapsed", isExpanded);
    });
  });
}

function initSidebarAnchorState() {
  cleanupSidebarAnchorState();

  const currentPath = normalizePath(window.location.pathname);
  const anchorLinks = Array.from(document.querySelectorAll("[data-sidebar-anchor]"))
    .filter((link) => {
      const href = link.getAttribute("href");
      if (!href) return false;
      const url = new URL(href, window.location.origin);
      return normalizePath(url.pathname) === currentPath && Boolean(url.hash);
    });

  if (!anchorLinks.length) return;

  const linkById = new Map();
  const targets = [];

  anchorLinks.forEach((link) => {
    const url = new URL(link.getAttribute("href"), window.location.origin);
    const id = decodeURIComponent(url.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;

    if (!linkById.has(id)) {
      linkById.set(id, []);
      targets.push(target);
    }
    linkById.get(id).push(link);
  });

  if (!targets.length) return;

  const anchorStateController = new AbortController();
  const { signal } = anchorStateController;
  cleanupSidebarAnchorState = () => anchorStateController.abort();

  const setActiveAnchor = (id) => {
    anchorLinks.forEach((link) => link.classList.remove("is-current-anchor"));
    if (!id || !linkById.has(id)) return;
    linkById.get(id).forEach((link) => link.classList.add("is-current-anchor"));
  };

  const updateActiveAnchor = () => {
    const referenceY = window.innerHeight * 0.36;
    let activeTarget = null;

    targets.forEach((target, index) => {
      const rect = target.getBoundingClientRect();
      const nextTarget = targets[index + 1];
      const nextContent = target.nextElementSibling;
      const rangeBottom = nextTarget
        ? nextTarget.getBoundingClientRect().top
        : Math.max(
            rect.bottom,
            nextContent?.getBoundingClientRect().bottom ?? rect.bottom
          );

      if (rect.top <= referenceY && rangeBottom > referenceY) {
        activeTarget = target;
      }
    });

    setActiveAnchor(activeTarget?.id);
  };

  let ticking = false;
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      updateActiveAnchor();
    });
  };

  window.addEventListener("scroll", requestUpdate, { passive: true, signal });
  window.addEventListener("resize", requestUpdate, { signal });
  window.addEventListener("hashchange", requestUpdate, { signal });
  updateActiveAnchor();
}

function parseSidebarOverrides(value) {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function findSidebarGroupChildren(sidebar, groupKey) {
  if (!sidebar || !groupKey) return null;

  return Array.from(sidebar.querySelectorAll("[data-sidebar-group-children]"))
    .find((children) => children.dataset.sidebarGroupKey === groupKey) ?? null;
}

function expandSidebarGroupForChildren(children) {
  const group = children?.closest("[data-sidebar-collapsible]");
  if (!group) return;

  const toggle = group.querySelector("[data-sidebar-toggle]");
  group.classList.remove("is-collapsed");
  children.hidden = false;
  toggle?.setAttribute("aria-expanded", "true");
}

function applyCharacterSidebarMode(mode = "normal") {
  const currentPath = normalizePath(window.location.pathname);
  if (!currentPath.startsWith("/characters/")) return;

  document.querySelectorAll("[data-sidebar-link-path]").forEach((link) => {
    if (link.dataset.sidebarLinkPath !== currentPath) return;

    const overrides = parseSidebarOverrides(link.dataset.sidebarModeOverrides);
    if (!overrides) return;

    const modeOverride = overrides[mode] ?? {};
    const targetGroupKey = modeOverride.groupKey ?? link.dataset.sidebarOriginalGroupKey;
    const targetIcon = modeOverride.icon ?? link.dataset.sidebarOriginalIcon;
    const sidebar = link.closest(".chrome-sidebar");
    const targetChildren = findSidebarGroupChildren(sidebar, targetGroupKey);

    if (targetChildren && link.parentElement !== targetChildren) {
      targetChildren.appendChild(link);
    }

    const icon = link.querySelector("[data-sidebar-icon]");
    if (icon && targetIcon) {
      icon.setAttribute("src", targetIcon);
    }

    expandSidebarGroupForChildren(targetChildren);
  });
}

function initCharacterSidebarModeOverrides() {
  applyCharacterSidebarMode(
    document.querySelector(".archive-page.is-characters")?.getAttribute("data-character-archive-mode") ?? "normal"
  );

  if (window.__chromeSidebarModeOverrideBound) return;
  window.__chromeSidebarModeOverrideBound = true;
  window.addEventListener("character-archive-mode-change", (event) => {
    applyCharacterSidebarMode(event.detail?.mode ?? "normal");
  });
}

export function initChromeSidebar() {
  initSidebarCollapsibleGroups();
  initSidebarAnchorState();
  initCharacterSidebarModeOverrides();
}
