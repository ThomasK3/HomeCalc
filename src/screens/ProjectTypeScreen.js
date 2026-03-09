import React from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";

const types = [
  { id: "dum", icon: "🏠", label: "Dům", disabled: true },
  { id: "byt", icon: "🏢", label: "Byt", disabled: false },
  { id: "mistnost", icon: "🚪", label: "Jedna místnost", disabled: false },
];

export default function ProjectTypeScreen({ onSelect, onBack }) {
  return (
    <Layout onBack={onBack}>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Co budete rekonstruovat?</h2>
      <div className="grid grid-cols-3 gap-3">
        {types.map((t) => (
          <Tile
            key={t.id}
            icon={t.icon}
            label={t.label}
            disabled={t.disabled}
            badge={t.disabled ? "Připravujeme" : null}
            onClick={() => onSelect(t.id)}
          />
        ))}
      </div>
    </Layout>
  );
}
