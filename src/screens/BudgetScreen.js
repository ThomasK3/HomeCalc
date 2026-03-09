import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import { calculateBudget } from "../calculate";
import { DEFAULT_HOURLY_RATE, MATERIAL_CLASS_LABELS, LOCATION_LABELS } from "../prices";

export default function BudgetScreen({ project, onEdit }) {
  const [hourlyRate, setHourlyRate] = useState(DEFAULT_HOURLY_RATE);
  const budget = useMemo(() => calculateBudget(project, hourlyRate), [project, hourlyRate]);

  const fmt = (n) => n.toLocaleString("cs-CZ");

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Orientační rozpočet</h2>
      <p className="text-sm text-gray-500 mb-6">
        Koupelna {budget.area} m² · {MATERIAL_CLASS_LABELS[project.materialClass]} · {LOCATION_LABELS[project.location]}
      </p>

      {/* Hourly rate */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">Hodinová sazba řemeslníka</span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-20 text-right border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-primary"
          />
          <span className="text-sm text-gray-500">Kč/hod</span>
        </div>
      </div>

      {/* Materials */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Materiál</h3>
        <div className="space-y-2">
          {budget.materialItems.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <div className="text-gray-600">
                {item.label}
                {item.qty && (
                  <span className="text-gray-400 ml-1">
                    {item.qty} × {fmt(item.unitPrice)} Kč
                  </span>
                )}
              </div>
              <span className="font-medium text-gray-800">
                {item.cost > 0 ? (item.qty ? "" : "od ") + fmt(item.cost) + " Kč" : "—"}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t mt-3 pt-2 flex justify-between text-sm font-semibold">
          <span>Materiál celkem</span>
          <span>{fmt(budget.materialTotal)} Kč</span>
        </div>
      </div>

      {/* Labor */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
          Práce (při sazbě {fmt(hourlyRate)} Kč/hod)
        </h3>
        <div className="space-y-2">
          {budget.laborItems.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <div className="text-gray-600">
                {item.label}
                <span className="text-gray-400 ml-1">
                  {item.hours} h × {fmt(hourlyRate)} Kč
                </span>
              </div>
              <span className="font-medium text-gray-800">{fmt(item.cost)} Kč</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-3 pt-2 flex justify-between text-sm font-semibold">
          <span>Práce celkem</span>
          <span>{fmt(budget.laborTotal)} Kč</span>
        </div>
      </div>

      {/* Reserve */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Rezerva (+10 %)</span>
          <span className="font-medium">{fmt(budget.reserve)} Kč</span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-primary rounded-xl p-5 text-white text-center mb-6">
        <p className="text-sm opacity-75 mb-1">Celkový odhad</p>
        <p className="text-3xl font-bold">
          {fmt(budget.totalMin)} – {fmt(budget.totalMax)} Kč
        </p>
      </div>

      <p className="text-xs text-gray-400 text-center mb-6">
        Orientační odhad. Finální cena závisí na konkrétních materiálech a dodavateli.
      </p>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onEdit}
          className="w-full py-3 rounded-xl text-lg font-semibold bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Upravit projekt
        </button>
        <button
          disabled
          className="w-full py-3 rounded-xl text-lg font-semibold bg-disabled text-gray-400 cursor-not-allowed relative"
        >
          Uložit jako PDF
          <span className="absolute -top-2 -right-2 bg-amber-400 text-xs text-gray-800 px-2 py-0.5 rounded-full font-medium">
            Připravujeme
          </span>
        </button>
        <button
          disabled
          className="w-full py-3 rounded-xl text-lg font-semibold bg-disabled text-gray-400 cursor-not-allowed relative"
        >
          Sdílet odkaz
          <span className="absolute -top-2 -right-2 bg-amber-400 text-xs text-gray-800 px-2 py-0.5 rounded-full font-medium">
            Připravujeme
          </span>
        </button>
      </div>
    </Layout>
  );
}
