import React, { useState } from "react";
import Layout from "../components/Layout";

export default function DimensionsScreen({ onNext, onBack }) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const valid = parseFloat(length) > 0 && parseFloat(width) > 0;

  return (
    <Layout onBack={onBack}>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Jaké jsou rozměry koupelny?</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Délka (m)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-primary"
            placeholder="např. 3.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Šířka (m)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-primary"
            placeholder="např. 2.5"
          />
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">Nemusí být přesné, orientační rozměry stačí.</p>
      <button
        disabled={!valid}
        onClick={() => onNext(parseFloat(length), parseFloat(width))}
        className={`mt-6 w-full py-3 rounded-xl text-lg font-semibold transition-colors ${
          valid ? "bg-primary text-white hover:bg-primary-light" : "bg-disabled text-gray-400 cursor-not-allowed"
        }`}
      >
        Pokračovat
      </button>
    </Layout>
  );
}
