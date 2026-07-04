const rawHomeCoverFrames = [
  { type: "blue-outline", x: 7.18, y: 6.47, w: 7.02, h: 8.12 },
  { type: "blue-outline", x: 11.32, y: 4.3, w: 3.48, h: 4.73 },
  { type: "blue-outline", x: 36.88, y: 7.61, w: 1.15, h: 4.76 },
  { type: "blue-outline", x: 37.43, y: 10.18, w: 2.85, h: 5.79 },
  { type: "blue-outline", x: 42.66, y: 28.22, w: 2, h: 8.15 },
  { type: "blue-outline", x: 76.7, y: 4.48, w: 7.25, h: 17.45 },
  { type: "blue-outline", x: 80.71, y: 7.64, w: 2.31, h: 23.86 },
  { type: "blue-outline", x: 82.06, y: 26.4, w: 2.95, h: 6.16 },
  { type: "blue-outline", x: 89.11, y: 38.97, w: 0.45, h: 1.8 },
  { type: "blue-outline", x: 90.15, y: 37, w: 1.51, h: 8.24 },
  { type: "blue-outline", x: 81.53, y: 44.04, w: 1.68, h: 4.33 },
  { type: "blue-outline", x: 82.63, y: 46.01, w: 4.43, h: 10.69 },
  { type: "blue-outline", x: 49.18, y: 50.11, w: 2.69, h: 6.19 },
  { type: "blue-outline", x: 45.27, y: 53.62, w: 4.79, h: 13.65 },
  { type: "blue-outline", x: 32.86, y: 53.93, w: 3.48, h: 2.99 },
  { type: "blue-outline", x: 34.72, y: 54.76, w: 6.88, h: 5.62 },
  { type: "blue-outline", x: 80.52, y: 69.24, w: 1.99, h: 3.79 },
  { type: "blue-outline", x: 82.1, y: 70.21, w: 8, h: 19.27 },
  { type: "blue-outline", x: 89.27, y: 77.82, w: 3.72, h: 7.33 },
  { type: "blue-outline", x: 83.23, y: 82.5, w: 4.14, h: 12.51 },

  { type: "black-outline", x: 3.43, y: 23.83, w: 3.58, h: 11.6 },
  { type: "black-outline", x: 6.05, y: 31.7, w: 2, h: 4.87 },
  { type: "black-outline", x: 12.08, y: 48.89, w: 1.75, h: 11.4 },
  { type: "black-outline", x: 10.39, y: 57.73, w: 2.16, h: 3.73 },
  { type: "black-outline", x: 18.59, y: 79.7, w: 5.93, h: 15.68 },
  { type: "black-outline", x: 23.6, y: 73.66, w: 2.55, h: 15.39 },
  { type: "black-outline", x: 25.91, y: 79.56, w: 2.44, h: 3.14 },
  { type: "black-outline", x: 48.67, y: 64.05, w: 4.22, h: 11.35 },
  { type: "black-outline", x: 51.14, y: 69.67, w: 2.84, h: 9.18 },
  { type: "black-outline", x: 65.65, y: 37.03, w: 1.97, h: 8.89 },
  { type: "black-outline", x: 66.97, y: 42.5, w: 4.41, h: 11 },

  { type: "gold-outline", x: 12.09, y: 10.75, w: 5.71, h: 10.72 },
  { type: "gold-outline", x: 16.65, y: 18.73, w: 1.72, h: 9.64 },
  { type: "gold-outline", x: 5.74, y: 23.83, w: 5.23, h: 19.87 },
  { type: "gold-outline", x: 3.46, y: 38.23, w: 5.36, h: 13.65 },
  { type: "gold-outline", x: 55.48, y: 46.92, w: 5.39, h: 13.65 },
  { type: "gold-outline", x: 53.34, y: 55.07, w: 5.26, h: 19.87 },
  { type: "gold-outline", x: 45.94, y: 70.44, w: 1.75, h: 9.61 },
  { type: "gold-outline", x: 46.5, y: 77.31, w: 5.74, h: 10.75 },
  { type: "gold-outline", x: 70.64, y: 30.64, w: 1.38, h: 7.13 },
  { type: "gold-outline", x: 70.19, y: 35.23, w: 0.9, h: 4.42 },
  { type: "gold-outline", x: 70.04, y: 48.69, w: 3.51, h: 9.29 },

  { type: "blue-filled", x: 84.93, y: 3.28, w: 0.3, h: 1.68 },
  { type: "blue-filled", x: 84.2, y: 5.73, w: 0.19, h: 1.2 },
  { type: "blue-filled", x: 13.55, y: 12.83, w: 1.57, h: 4.96 },
  { type: "blue-filled", x: 3.51, y: 21.84, w: 1.35, h: 5.13 },
  { type: "blue-filled", x: 95.08, y: 22.92, w: 0.21, h: 0.51 },
  { type: "blue-filled", x: 94.03, y: 24.66, w: 0.88, h: 2.91 },
  { type: "blue-filled", x: 41.77, y: 26.31, w: 1.27, h: 4.13 },
  { type: "blue-filled", x: 8.45, y: 26.82, w: 0.96, h: 9.29 },
  { type: "blue-filled", x: 84.24, y: 27, w: 1.8, h: 9.15 },
  { type: "blue-filled", x: 91.24, y: 30.44, w: 0.14, h: 0.8 },
  { type: "blue-filled", x: 44.96, y: 31.53, w: 0.5, h: 4.85 },
  { type: "blue-filled", x: 91.31, y: 34.61, w: 1.41, h: 5.19 },
  { type: "blue-filled", x: 41.31, y: 37.69, w: 0.51, h: 3.02 },
  { type: "blue-filled", x: 42.33, y: 38.43, w: 3.42, h: 0.48 },
  { type: "blue-filled", x: 70.43, y: 39.65, w: 2.07, h: 5.22 },
  { type: "blue-filled", x: 77.47, y: 41.96, w: 4.59, h: 3.65 },
  { type: "blue-filled", x: 17.54, y: 43.84, w: 0.79, h: 0.97 },
  { type: "blue-filled", x: 18.95, y: 44.07, w: 0.29, h: 6.3 },
  { type: "blue-filled", x: 16.18, y: 46.55, w: 0.37, h: 3.96 },
  { type: "blue-filled", x: 14.46, y: 47.26, w: 0.75, h: 1.28 },
  { type: "blue-filled", x: 11, y: 47.41, w: 0.32, h: 1.2 },
  { type: "blue-filled", x: 68.65, y: 48.57, w: 1.99, h: 11.35 },
  { type: "blue-filled", x: 8.61, y: 48.89, w: 2.02, h: 4.73 },
  { type: "blue-filled", x: 84.33, y: 50.2, w: 1.03, h: 8.04 },
  { type: "blue-filled", x: 40.07, y: 57.24, w: 0.48, h: 4.16 },
  { type: "blue-filled", x: 13.61, y: 58.69, w: 0.83, h: 5.07 },
  { type: "blue-filled", x: 38.87, y: 59.15, w: 0.83, h: 5.62 },
  { type: "blue-filled", x: 28.09, y: 60.6, w: 0.58, h: 2.91 },
  { type: "blue-filled", x: 29.71, y: 65.05, w: 1.43, h: 3.02 },
  { type: "blue-filled", x: 66.15, y: 65.34, w: 0.85, h: 11.97 },
  { type: "blue-filled", x: 27.1, y: 66.22, w: 1.56, h: 11.29 },
  { type: "blue-filled", x: 72.47, y: 66.31, w: 0.4, h: 4.25 },
  { type: "blue-filled", x: 54.11, y: 66.96, w: 0.38, h: 0.57 },
  { type: "blue-filled", x: 88.81, y: 67.96, w: 0.48, h: 4.45 },
  { type: "blue-filled", x: 73.33, y: 68.22, w: 0.3, h: 0.23 },
  { type: "blue-filled", x: 81.38, y: 68.42, w: 1.57, h: 5.5 },
  { type: "blue-filled", x: 68.87, y: 69.24, w: 2.33, h: 0.43 },
  { type: "blue-filled", x: 48.43, y: 73.52, w: 1.04, h: 7.41 },
  { type: "blue-filled", x: 22, y: 77.17, w: 3.13, h: 7.16 },
  { type: "blue-filled", x: 80.74, y: 80.84, w: 3.46, h: 7.47 },
];

const frameDelayConfig = {
  "blue-outline": { base: 1450, step: 18 },
  "blue-filled": { base: 1580, step: 8 },
  "gold-outline": { base: 1840, step: 26 },
  "black-outline": { base: 2020, step: 22 },
};

function withFrameDelays(frames) {
  const countsByType = {};

  return frames.map((frame) => {
    const index = countsByType[frame.type] ?? 0;
    countsByType[frame.type] = index + 1;

    const config = frameDelayConfig[frame.type] ?? { base: 560, step: 18 };

    return {
      ...frame,
      delay: config.base + index * config.step,
    };
  });
}

export const homeCoverFrames = withFrameDelays(rawHomeCoverFrames);
