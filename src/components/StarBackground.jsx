import { useEffect, useMemo, useState } from "react";

const STEP_DURATION_MS = 320;
const BIKE_RADIUS_PX = 5;
const TRAIL_POINT_COUNT = 50;
const MOBILE_TRAIL_POINT_COUNT = 10;

const buildCircuitPath = (waypoints) => {
  const path = [];

  waypoints.forEach((point, index) => {
    const nextPoint = waypoints[(index + 1) % waypoints.length];

    if (!path.length) {
      path.push(point);
    }

    let currentX = point.x;
    let currentY = point.y;

    while (currentX !== nextPoint.x || currentY !== nextPoint.y) {
      if (currentX !== nextPoint.x) {
        currentX += currentX < nextPoint.x ? 1 : -1;
      } else if (currentY !== nextPoint.y) {
        currentY += currentY < nextPoint.y ? 1 : -1;
      }

      path.push({ x: currentX, y: currentY });
    }
  });

  return path;
};

const offsetCircuitFromCenter = (waypoints, laneOffset) => {
  const centerX =
    waypoints.reduce((sum, point) => sum + point.x, 0) / waypoints.length;
  const centerY =
    waypoints.reduce((sum, point) => sum + point.y, 0) / waypoints.length;

  return waypoints.map((point) => ({
    x:
      point.x +
      (point.x === centerX ? 0 : point.x > centerX ? laneOffset : -laneOffset),
    y:
      point.y +
      (point.y === centerY ? 0 : point.y > centerY ? laneOffset : -laneOffset),
  }));
};

const createCycle = (id, path, offset = 0, tone = "blue") => ({
  id,
  path,
  offset: offset % path.length,
  tone,
});

const getWrappedPoint = (path, index) => {
  const safeIndex = ((index % path.length) + path.length) % path.length;
  return path[safeIndex];
};

const isAdjacent = (current, previous, columns, rows) => {
  const dx = Math.abs(current.x - previous.x);
  const dy = Math.abs(current.y - previous.y);

  return (
    ((dx <= 1 && dx > 0) && dy === 0) ||
    (dx === columns - 1 && dy === 0) ||
    ((dy <= 1 && dy > 0) && dx === 0) ||
    (dy === rows - 1 && dx === 0)
  );
};

const getSegmentStyle = (
  current,
  previous,
  columns,
  rows,
  cellWidth,
  cellHeight,
  trimEndPx = 0
) => {
  const dx = current.x - previous.x;
  const dy = current.y - previous.y;

  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    return null;
  }

  if (dx !== 0) {
    const left = Math.min(current.x, previous.x) * cellWidth;
    const width = Math.abs(dx) * cellWidth;

    if (width === 0) {
      return null;
    }

    const movingRight = current.x > previous.x;
    return {
      left: movingRight
        ? `calc(${left}% - 1px)`
        : `calc(${left}% + ${trimEndPx}px - 1px)`,
      top: `calc(${current.y * cellHeight}% - 1px)`,
      width: `calc(${width}% + 2px - ${trimEndPx}px)`,
      height: "3px",
    };
  }

  const top = Math.min(current.y, previous.y) * cellHeight;
  const height = Math.abs(dy) * cellHeight;

  if (height === 0) {
    return null;
  }

  const movingDown = current.y > previous.y;
  return {
    left: `calc(${current.x * cellWidth}% - 1px)`,
    top: movingDown
      ? `calc(${top}% - 1px)`
      : `calc(${top}% + ${trimEndPx}px - 1px)`,
    width: "3px",
    height: `calc(${height}% + 2px - ${trimEndPx}px)`,
  };
};

export const StarBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [gridSize, setGridSize] = useState({ columns: 12, rows: 9 });
  const [cellSizePx, setCellSizePx] = useState(56);
  const [cycles, setCycles] = useState([]);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateGrid = () => {
      const mobile =
        window.innerWidth < 768 ||
        window.matchMedia("(pointer: coarse)").matches;
      const cellSize = mobile ? 42 : 56;
      const columns = Math.max(8, Math.ceil(window.innerWidth / cellSize));
      const rows = Math.max(10, Math.ceil(window.innerHeight / cellSize));
      const waypoints = mobile
        ? [
            { x: 1, y: 2 },
            { x: Math.max(3, columns - 2), y: 2 },
            { x: Math.max(3, columns - 2), y: 4 },
            { x: Math.max(5, Math.floor(columns * 0.72)), y: 4 },
            { x: Math.max(5, Math.floor(columns * 0.72)), y: Math.max(7, Math.floor(rows * 0.42)) },
            { x: Math.max(2, Math.floor(columns * 0.22)), y: Math.max(7, Math.floor(rows * 0.42)) },
            { x: Math.max(2, Math.floor(columns * 0.22)), y: Math.max(10, Math.floor(rows * 0.64)) },
            { x: Math.max(4, Math.floor(columns * 0.78)), y: Math.max(10, Math.floor(rows * 0.64)) },
            { x: Math.max(4, Math.floor(columns * 0.78)), y: Math.max(12, Math.floor(rows * 0.78)) },
            { x: 1, y: Math.max(12, Math.floor(rows * 0.78)) },
          ]
        : [
            { x: 2, y: 2 },
            { x: columns - 3, y: 2 },
            { x: columns - 3, y: 4 },
            { x: Math.floor(columns * 0.68), y: 4 },
            { x: Math.floor(columns * 0.68), y: Math.floor(rows * 0.36) },
            { x: Math.floor(columns * 0.33), y: Math.floor(rows * 0.36) },
            { x: Math.floor(columns * 0.33), y: Math.floor(rows * 0.57) },
            { x: Math.floor(columns * 0.74), y: Math.floor(rows * 0.57) },
            { x: Math.floor(columns * 0.74), y: Math.floor(rows * 0.78) },
            { x: 3, y: Math.floor(rows * 0.78) },
            { x: 3, y: Math.floor(rows * 0.23) },
          ];
      const laneOffsets = mobile ? [-0.5, 0, 0.5] : [-0.5, 0, 0.5];
      const clampPoint = (point) => ({
        x: Math.max(1, Math.min(columns - 2, point.x)),
        y: Math.max(1, Math.min(rows - 2, point.y)),
      });
      const circuitPaths = laneOffsets.map((laneOffset) =>
        buildCircuitPath(
          offsetCircuitFromCenter(waypoints, laneOffset).map(clampPoint)
        )
      );

      setCellSizePx(cellSize);
      setIsMobileView(mobile);
      setGridSize({ columns, rows });
      setCycles([
        createCycle(0, circuitPaths[0], 0, "blue"),
        createCycle(1, circuitPaths[1], 0, "orange"),
        ...(
          mobile
            ? []
            : [
                createCycle(
                  2,
                  circuitPaths[2],
                  Math.floor(circuitPaths[2].length / 2),
                  "green"
                ),
              ]
        ),
      ]);
      setElapsedMs(0);
    };

    updateGrid();

    const handleResize = () => {
      window.clearTimeout(handleResize.resizeTimeout);
      handleResize.resizeTimeout = window.setTimeout(updateGrid, 120);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(handleResize.resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!cycles.length || isMobileView) {
      return undefined;
    }

    let frameId;
    const startTime = performance.now();

    const animate = (now) => {
      setElapsedMs(now - startTime);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [cycles.length, isMobileView]);

  const cellWidth = useMemo(() => 100 / gridSize.columns, [gridSize.columns]);
  const cellHeight = useMemo(() => 100 / gridSize.rows, [gridSize.rows]);

  const majorGridClass = isDarkMode
    ? "absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(34,211,238,0.14)_2px,transparent_2px),linear-gradient(90deg,rgba(34,211,238,0.14)_2px,transparent_2px)]"
    : "absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,0,0,0.055)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.055)_2px,transparent_2px)]";
  const minorGridClass = isDarkMode
    ? "absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)]"
    : "absolute inset-0 opacity-6 [background-image:linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)]";
  const completedSteps = Math.floor(elapsedMs / STEP_DURATION_MS);
  const progress = (elapsedMs % STEP_DURATION_MS) / STEP_DURATION_MS;
  const activeTrailPointCount = isMobileView
    ? MOBILE_TRAIL_POINT_COUNT
    : TRAIL_POINT_COUNT;

  return (
    <div
      className={
        isDarkMode
          ? "fixed inset-0 z-0 overflow-hidden bg-[#01030a] text-cyan-200 pointer-events-none"
          : "fixed inset-0 z-0 overflow-hidden bg-white text-neutral-950 pointer-events-none"
      }
    >
      <div
        className={
          isDarkMode
            ? "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_28%),linear-gradient(180deg,rgba(1,3,10,0.98),rgba(3,8,20,1))]"
            : "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.045),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,245,245,1))]"
        }
      />

      <div
        className={majorGridClass}
        style={{
          backgroundSize: `${cellSizePx}px ${cellSizePx}px`,
        }}
      />
      <div
        className={minorGridClass}
        style={{
          backgroundSize: `${cellSizePx / 3}px ${cellSizePx / 3}px`,
        }}
      />

      {!isMobileView &&
        cycles.map((cycle) => {
          const currentIndex = cycle.offset + completedSteps;
          const currentPoint = getWrappedPoint(cycle.path, currentIndex);
          const nextPoint = getWrappedPoint(cycle.path, currentIndex + 1);
          const livePoint = {
            x: currentPoint.x + (nextPoint.x - currentPoint.x) * progress,
            y: currentPoint.y + (nextPoint.y - currentPoint.y) * progress,
          };
          const trailPoints = Array.from({ length: activeTrailPointCount }, (_, index) =>
            getWrappedPoint(
              cycle.path,
              currentIndex - (activeTrailPointCount - 1 - index)
            )
          );
          const renderPoints = [...trailPoints, livePoint];

          return (
            <div key={cycle.id} className="absolute inset-0">
              {renderPoints.map((point, index, points) => {
            if (index === 0) {
              return null;
            }

            const previous = points[index - 1];
            const isActiveSegment = index === points.length - 1;

            if (!isAdjacent(point, previous, gridSize.columns, gridSize.rows)) {
              return null;
            }

            const segmentStyle = getSegmentStyle(
              point,
              previous,
              gridSize.columns,
              gridSize.rows,
              cellWidth,
              cellHeight,
              isActiveSegment ? BIKE_RADIUS_PX + 1 : 0
            );

            if (!segmentStyle) {
              return null;
            }

            const opacity = index / renderPoints.length;

            return (
              <div
                key={`${cycle.id}-${index}`}
                className={
                  `absolute rounded-[1px] ${
                    cycle.tone === "orange"
                      ? isDarkMode
                        ? "bg-amber-300"
                        : "bg-orange-500"
                      : cycle.tone === "green"
                        ? isDarkMode
                          ? "bg-lime-300"
                          : "bg-lime-500"
                        : isDarkMode
                          ? "bg-cyan-300"
                          : "bg-sky-500"
                  }`
                }
                style={{
                  ...segmentStyle,
                  opacity: opacity * (isDarkMode ? 0.8 : 0.45),
                  boxShadow:
                    isDarkMode && cycle.tone === "orange"
                      ? "0 0 10px rgba(251,191,36,0.85), 0 0 24px rgba(249,115,22,0.6)"
                      : isDarkMode && cycle.tone === "green"
                        ? "0 0 10px rgba(163,230,53,0.85), 0 0 24px rgba(74,222,128,0.6)"
                      : isDarkMode
                        ? "0 0 10px rgba(34,211,238,0.8), 0 0 24px rgba(34,211,238,0.55)"
                        : cycle.tone === "orange"
                          ? "0 0 8px rgba(249,115,22,0.35), 0 0 18px rgba(251,146,60,0.25)"
                          : cycle.tone === "green"
                            ? "0 0 8px rgba(132,204,22,0.35), 0 0 18px rgba(74,222,128,0.22)"
                            : "0 0 8px rgba(14,165,233,0.32), 0 0 18px rgba(56,189,248,0.22)",
                }}
              />
            );
              })}

              <div
                className={
                  `absolute rounded-full ${
                    cycle.tone === "orange"
                      ? isDarkMode
                        ? "bg-amber-200"
                        : "bg-orange-400"
                      : cycle.tone === "green"
                        ? isDarkMode
                          ? "bg-lime-200"
                          : "bg-lime-400"
                        : isDarkMode
                          ? "bg-cyan-200"
                          : "bg-sky-400"
                  }`
                }
                style={{
                  left: `calc(${livePoint.x * cellWidth}% - ${BIKE_RADIUS_PX}px)`,
                  top: `calc(${livePoint.y * cellHeight}% - ${BIKE_RADIUS_PX}px)`,
                  width: `${BIKE_RADIUS_PX * 2}px`,
                  height: `${BIKE_RADIUS_PX * 2}px`,
                  boxShadow:
                    isDarkMode && cycle.tone === "orange"
                      ? "0 0 12px rgba(254,215,170,1), 0 0 28px rgba(249,115,22,0.88), 0 0 42px rgba(245,158,11,0.65)"
                      : isDarkMode && cycle.tone === "green"
                        ? "0 0 12px rgba(217,249,157,1), 0 0 28px rgba(74,222,128,0.88), 0 0 42px rgba(132,204,22,0.65)"
                      : isDarkMode
                        ? "0 0 12px rgba(103,232,249,1), 0 0 28px rgba(34,211,238,0.85), 0 0 42px rgba(34,211,238,0.55)"
                        : cycle.tone === "orange"
                          ? "0 0 10px rgba(251,146,60,0.45), 0 0 20px rgba(249,115,22,0.3)"
                          : cycle.tone === "green"
                            ? "0 0 10px rgba(132,204,22,0.4), 0 0 20px rgba(74,222,128,0.28)"
                            : "0 0 10px rgba(56,189,248,0.42), 0 0 20px rgba(14,165,233,0.28)",
                }}
              />
            </div>
          );
        })}
    </div>
  );
};
