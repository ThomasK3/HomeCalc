import React from "react";

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Krok {current} z {total}</span>
        <span>{pct} %</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full">
        <div
          className="h-1.5 bg-primary rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
