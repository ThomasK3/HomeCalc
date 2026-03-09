import React from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";

const rooms = [
  { id: "koupelna", icon: "🛁", label: "Koupelna", disabled: false },
  { id: "kuchyn", icon: "🍳", label: "Kuchyň", disabled: true },
  { id: "loznice", icon: "🛏", label: "Ložnice", disabled: true },
  { id: "obyvak", icon: "🪑", label: "Obývací pokoj", disabled: true },
  { id: "wc", icon: "🚽", label: "WC", disabled: true },
];

export default function RoomSelectScreen({ onSelect, onBack }) {
  return (
    <Layout onBack={onBack}>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Kterou místnost?</h2>
      <div className="grid grid-cols-3 gap-3">
        {rooms.map((r) => (
          <Tile
            key={r.id}
            icon={r.icon}
            label={r.label}
            disabled={r.disabled}
            badge={r.disabled ? "Připravujeme" : null}
            onClick={() => onSelect(r.id)}
          />
        ))}
      </div>
    </Layout>
  );
}
