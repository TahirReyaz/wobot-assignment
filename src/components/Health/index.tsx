import React from "react";

import { Health as HealthType, HealthValue } from "../../types/Camera";
import { healthGrades } from "../../utils/constants";

const Health = ({ cloud, device }: HealthType) => {
  const getHealthStyle = (grade: keyof typeof healthGrades) => {
    const { color, value } = healthGrades[grade];
    return { color, value };
  };

  const renderHealthRing = (health: HealthValue, label: string) => {
    const { color, value } = getHealthStyle(health);
    const radius = 12; // Radius of the circle
    const stroke = 2; // Stroke width
    const circumference = 2 * Math.PI * radius;
    const progress = (value / 100) * circumference; // Calculate the stroke offset

    return (
      <div className="flex items-center">
        <svg
          className="w-20 h-20 transform -rotate-90"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="lightgray"
            strokeWidth={stroke}
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="40"
            cy="40"
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
        <span className="absolute text-lg font-bold -mt-16">{health}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center">
      {/* Cloud Health */}
      {cloud && renderHealthRing(cloud, "Cloud")}
      {/* Device Health */}
      {device && renderHealthRing(device, "Device")}
    </div>
  );
};

export default Health;
