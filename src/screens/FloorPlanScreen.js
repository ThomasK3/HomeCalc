import React, { useMemo } from "react";
import Layout from "../components/Layout";
import { calculateBudget } from "../calculate";
import { DEFAULT_HOURLY_RATE } from "../prices";

function FloorPlanCanvas({ project }) {
  const { length, width, shower, sink, toilet } = project;

  const SCALE = 80;
  const PAD = 30;
  const roomW = width * SCALE;
  const roomH = length * SCALE;
  const svgW = roomW + PAD * 2;
  const svgH = roomH + PAD * 2;

  const objects = [];

  // Vana → longest wall, far from door
  if (shower === "vana" || shower === "oboje") {
    objects.push({
      label: "Vana",
      emoji: "🛁",
      x: PAD + 2,
      y: PAD + 2,
      w: Math.min(170 * (SCALE / 80), roomW - 4),
      h: 60 * (SCALE / 80),
      size: "170×70 cm",
      color: "#DBEAFE",
    });
  }

  // Sprcha → corner
  if (shower === "sprcha" || shower === "oboje") {
    const spX = shower === "oboje" ? PAD + roomW - 82 * (SCALE / 80) : PAD + 2;
    objects.push({
      label: "Sprcha",
      emoji: "🚿",
      x: spX,
      y: PAD + 2,
      w: 80 * (SCALE / 80),
      h: 80 * (SCALE / 80),
      size: "80×80 cm",
      color: "#E0E7FF",
    });
  }

  // WC → near door (bottom), wall
  if (toilet === "ano") {
    objects.push({
      label: "WC",
      emoji: "🚽",
      x: PAD + roomW - 42 * (SCALE / 80),
      y: PAD + roomH - 65 * (SCALE / 80),
      w: 40 * (SCALE / 80),
      h: 60 * (SCALE / 80),
      size: "40×60 cm",
      color: "#FEF3C7",
    });
  }

  // Umyvadlo → free wall
  if (sink) {
    const sinkW = sink === "dvojite" ? 120 : 60;
    objects.push({
      label: "Umyvadlo",
      emoji: "🪥",
      x: PAD + roomW - (sinkW + 4) * (SCALE / 80),
      y: PAD + roomH / 2 - 25 * (SCALE / 80),
      w: sinkW * (SCALE / 80),
      h: 45 * (SCALE / 80),
      size: `${sinkW}×45 cm`,
      color: "#ECFDF5",
    });
  }

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[400px] mx-auto">
      {/* Room */}
      <rect x={PAD} y={PAD} width={roomW} height={roomH} fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="2" />

      {/* Door indicator */}
      <line
        x1={PAD + roomW / 2 - 25}
        y1={PAD + roomH}
        x2={PAD + roomW / 2 + 25}
        y2={PAD + roomH}
        stroke="#1E3A5F"
        strokeWidth="4"
      />
      <text x={PAD + roomW / 2} y={PAD + roomH + 16} textAnchor="middle" fontSize="10" fill="#6B7280">
        dveře
      </text>

      {/* Dimension labels */}
      <text x={PAD + roomW / 2} y={PAD - 10} textAnchor="middle" fontSize="11" fill="#6B7280">
        {width} m
      </text>
      <text
        x={PAD - 12}
        y={PAD + roomH / 2}
        textAnchor="middle"
        fontSize="11"
        fill="#6B7280"
        transform={`rotate(-90, ${PAD - 12}, ${PAD + roomH / 2})`}
      >
        {length} m
      </text>

      {/* Objects */}
      {objects.map((obj, i) => (
        <g key={i}>
          <rect x={obj.x} y={obj.y} width={obj.w} height={obj.h} fill={obj.color} stroke="#6B7280" strokeWidth="1" rx="3" />
          <text x={obj.x + obj.w / 2} y={obj.y + obj.h / 2 - 4} textAnchor="middle" fontSize="14">
            {obj.emoji}
          </text>
          <text x={obj.x + obj.w / 2} y={obj.y + obj.h / 2 + 10} textAnchor="middle" fontSize="8" fill="#374151">
            {obj.label}
          </text>
          <text x={obj.x + obj.w / 2} y={obj.y + obj.h / 2 + 19} textAnchor="middle" fontSize="7" fill="#9CA3AF">
            {obj.size}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function FloorPlanScreen({ project, onNext, onBack }) {
  const budget = useMemo(() => calculateBudget(project, DEFAULT_HOURLY_RATE), [project]);

  return (
    <Layout onBack={onBack}>
      <p className="text-sm text-gray-500 mb-4">Navržené rozmístění — můžete upravit v další verzi.</p>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <FloorPlanCanvas project={project} />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 text-center">
        <p className="text-sm text-gray-500">Průběžná orientační cena</p>
        <p className="text-3xl font-bold text-price mt-1">
          {budget.totalMin.toLocaleString("cs-CZ")} – {budget.totalMax.toLocaleString("cs-CZ")} Kč
        </p>
      </div>

      <button
        onClick={onNext}
        className="mt-6 w-full py-3 rounded-xl text-lg font-semibold bg-primary text-white hover:bg-primary-light transition-colors"
      >
        Zobrazit rozpočet
      </button>
    </Layout>
  );
}
