import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ charts
   All charts are plain SVG: no chart dependency, no client JavaScript, and a
   stable layout at every width. Each one ships an accessible summary so the
   numbers survive a screen reader.
   -------------------------------------------------------------------------- */

type Point = { label: string; value: number };

export function AreaChart({
  data,
  height = 180,
  tone = "mint",
  showGrid = true,
  className,
  id,
}: {
  data: Point[];
  height?: number;
  tone?: "mint" | "azure" | "amber";
  showGrid?: boolean;
  className?: string;
  id: string;
}) {
  const width = 640;
  const max = Math.max(...data.map((point) => point.value)) * 1.15;
  const min = 0;
  const stepX = width / Math.max(1, data.length - 1);

  const points = data.map((point, index) => ({
    x: index * stepX,
    y: height - ((point.value - min) / (max - min)) * height,
  }));

  // Catmull-Rom -> cubic Bezier, so the line reads as a trend rather than a
  // sequence of straight segments.
  const line = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x},${point.y}`;
      const previous = points[index - 1];
      const controlX = (previous.x + point.x) / 2;
      return `C ${controlX},${previous.y} ${controlX},${point.y} ${point.x},${point.y}`;
    })
    .join(" ");

  const area = `${line} L ${width},${height} L 0,${height} Z`;
  const colors = {
    mint: { stroke: "#3ddc97", fill: "url(#mintFill)" },
    azure: { stroke: "#5b8cff", fill: "url(#azureFill)" },
    amber: { stroke: "#f7b955", fill: "url(#amberFill)" },
  }[tone];

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
        role="img"
        aria-labelledby={`${id}-title`}
        style={{ height }}
      >
        <title id={`${id}-title`}>
          {data.map((point) => `${point.label}: ${point.value}`).join(", ")}
        </title>
        <defs>
          <linearGradient id="mintFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3ddc97" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#3ddc97" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="azureFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="amberFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7b955" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f7b955" stopOpacity="0" />
          </linearGradient>
        </defs>

        {showGrid
          ? [0.25, 0.5, 0.75, 1].map((fraction) => (
              <line
                key={fraction}
                x1="0"
                x2={width}
                y1={height * fraction}
                y2={height * fraction}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="2 6"
                vectorEffect="non-scaling-stroke"
              />
            ))
          : null}

        <path d={area} fill={colors.fill} />
        <path
          d={line}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="#040a08"
            stroke={colors.stroke}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-fog-faint">
        {data.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}

export function Sparkline({
  values,
  tone = "mint",
  className,
}: {
  values: number[];
  tone?: "mint" | "amber" | "rose" | "neutral";
  className?: string;
}) {
  const width = 96;
  const height = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const path = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 4) - 2;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const stroke = {
    mint: "#3ddc97",
    amber: "#f7b955",
    rose: "#fb7185",
    neutral: "#93aaa2",
  }[tone];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-7 w-24", className)}
      fill="none"
      aria-hidden
    >
      <path d={path} stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BarChart({
  data,
  height = 140,
  className,
}: {
  data: Point[];
  height?: number;
  className?: string;
}) {
  const max = Math.max(...data.map((point) => point.value));
  return (
    <div className={className}>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((point, index) => (
          <div key={point.label} className="group flex h-full flex-1 flex-col justify-end gap-2">
            <div className="relative flex-1">
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 rounded-t-[4px] transition-colors",
                  index === data.length - 1
                    ? "bg-[linear-gradient(180deg,#a9f5d2,#3ddc97)]"
                    : "bg-[linear-gradient(180deg,rgba(61,220,151,0.5),rgba(61,220,151,0.16))] group-hover:bg-[linear-gradient(180deg,rgba(61,220,151,0.8),rgba(61,220,151,0.3))]",
                )}
                style={{ height: `${(point.value / max) * 100}%` }}
              />
            </div>
            <span className="text-center text-[10px] uppercase tracking-wide text-fog-faint">
              {point.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Donut({
  segments,
  size = 132,
  thickness = 12,
  centerLabel,
  centerValue,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={thickness}
          />
          {segments.map((segment) => {
            const dash = (segment.value / total) * circumference;
            const element = (
              <circle
                key={segment.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash - 2} ${circumference - dash + 2}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              />
            );
            offset += dash;
            return element;
          })}
        </svg>
        {centerValue ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-extrabold tnum text-bone">{centerValue}</span>
            <span className="text-[9px] uppercase tracking-wider text-fog-faint">{centerLabel}</span>
          </div>
        ) : null}
      </div>

      <ul className="min-w-0 flex-1 space-y-2">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-[11.5px]">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="min-w-0 flex-1 truncate text-fog">{segment.label}</span>
            <span className="tnum font-semibold text-bone">{segment.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
