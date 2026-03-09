import React from "react";

export default function Tile({ icon, label, selected, disabled, badge, onClick, children }) {
  const base =
    "flex flex-col items-center justify-center min-h-[80px] rounded-xl border-2 px-4 py-4 cursor-pointer transition-all text-center";
  const activeClass = "border-primary bg-primary text-white shadow-md";
  const defaultClass = "border-gray-200 bg-white text-gray-800 hover:shadow-md";
  const disabledClass = "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60";

  return (
    <button
      type="button"
      className={`${base} ${disabled ? disabledClass : selected ? activeClass : defaultClass} relative`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {badge && (
        <span className="absolute -top-2 -right-2 bg-amber-400 text-xs text-gray-800 px-2 py-0.5 rounded-full font-medium">
          {badge}
        </span>
      )}
      {icon && <span className="text-2xl mb-1">{icon}</span>}
      <span className="text-sm font-medium">{label}</span>
      {children}
    </button>
  );
}
