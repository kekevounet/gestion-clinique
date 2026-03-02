import React, { useState, useEffect } from "react";
import { useTheme } from "../common/Theme";

interface ProgressCircleProps {
  maxValue: number;
  currentValue: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  duration?: number; // durée de l'animation en ms
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  maxValue,
  currentValue,
  size = 350,
  strokeWidth = 10,
  color = "#22c55e",
  backgroundColor = "#e5e7eb",
  duration = 1000,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const { theme } = useTheme();

  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setProgressValue(progress * currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [currentValue, duration]);

  const progress = Math.min(progressValue / maxValue, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="scale-50 lg:scale-100">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size * 0.2}
        stroke={`${theme === 'clair' ? '#000000' : '#ffffff' }`}
      >
        {Math.round(progress * 100)} %
      </text>
    </svg>
  );
};

export default ProgressCircle;