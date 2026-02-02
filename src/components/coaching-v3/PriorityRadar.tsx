import { motion } from "framer-motion";
import { useState } from "react";

interface Priority {
  keyword: string;
  count: number;
  insight: string;
}

interface PriorityRadarProps {
  priorities: Priority[];
}

const PriorityRadar = ({ priorities }: PriorityRadarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxCount = Math.max(...priorities.map((p) => p.count));

  const colors = [
    { stroke: "hsl(var(--accent-violet))", fill: "hsl(var(--accent-violet) / 0.2)" },
    { stroke: "hsl(var(--accent-blue))", fill: "hsl(var(--accent-blue) / 0.2)" },
    { stroke: "hsl(var(--accent-amber))", fill: "hsl(var(--accent-amber) / 0.2)" },
    { stroke: "hsl(var(--accent-emerald))", fill: "hsl(var(--accent-emerald) / 0.2)" },
    { stroke: "hsl(var(--accent-rose))", fill: "hsl(var(--accent-rose) / 0.2)" },
  ];

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;

  // Calculate points for radar
  const angleStep = (2 * Math.PI) / priorities.length;
  const points = priorities.map((priority, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const radius = (priority.count / maxCount) * maxRadius;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      labelX: centerX + Math.cos(angle) * (maxRadius + 30),
      labelY: centerY + Math.sin(angle) * (maxRadius + 30),
    };
  });

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="relative">
      <svg width="300" height="300" className="mx-auto">
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={maxRadius * scale}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {priorities.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const endX = centerX + Math.cos(angle) * maxRadius;
          const endY = centerY + Math.sin(angle) * maxRadius;
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {/* Filled area */}
        <motion.path
          d={pathData}
          fill="hsl(var(--accent-violet) / 0.2)"
          stroke="hsl(var(--accent-violet))"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={hoveredIndex === i ? 8 : 6}
            fill={colors[i % colors.length].stroke}
            stroke="white"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="cursor-pointer"
            style={{ filter: hoveredIndex === i ? "drop-shadow(0 0 8px currentColor)" : "none" }}
          />
        ))}

        {/* Labels */}
        {priorities.map((priority, i) => {
          const point = points[i];
          const isLeft = point.labelX < centerX;
          return (
            <motion.text
              key={i}
              x={point.labelX}
              y={point.labelY}
              textAnchor={isLeft ? "end" : "start"}
              dominantBaseline="middle"
              className="text-xs font-medium fill-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              {priority.keyword}
            </motion.text>
          );
        })}
      </svg>

      {/* Insight tooltip */}
      {hoveredIndex !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-xs p-4 rounded-2xl bg-card/95 backdrop-blur-sm border border-border shadow-xl"
        >
          <p className="text-sm font-medium text-foreground mb-1">
            "{priorities[hoveredIndex].keyword}" mentioned {priorities[hoveredIndex].count}×
          </p>
          <p className="text-xs text-muted-foreground">
            {priorities[hoveredIndex].insight}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PriorityRadar;
