import React from "react";

import { Health as HealthType, HealthValue } from "../../types/Camera";
import { healthGrades } from "../../utils/constants";
import { CloudIcon, ServerIcon } from "lucide-react";

const Health = ({ cloud, device }: HealthType) => {
  const getHealthStyle = (grade: keyof typeof healthGrades) => {
    const { color, value } = healthGrades[grade];
    return { color, value };
  };

  const renderHealthRing = (health: HealthValue) => {
    const { color, value } = getHealthStyle(health);
    const radius = 18; // Radius of the circle
    const stroke = 3; // Stroke width
    const circumference = 2 * Math.PI * radius;
    const progress = (value / 100) * circumference; // Calculate the stroke offset

    return (
      <div className="relative">
        <svg
          className="w-8 h-8 transform -rotate-90"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="lightgray"
            strokeWidth={stroke}
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </svg>
        {/* Health Percentage */}
        <span className="absolute text-sm left-3 bottom-2">{health}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-around">
      {/* Cloud Health */}
      {cloud && (
        <div className="flex items-center">
          <CloudIcon className="me-1 text-gray-400" size={16} />
          {renderHealthRing(cloud)}
        </div>
      )}
      {/* Device Health */}
      {device && (
        <div className="flex items-center">
          <ServerIcon className="me-1 text-gray-400" size={16} />
          {renderHealthRing(device)}
        </div>
      )}
    </div>
  );
};

export default Health;
