import React from "react";
import Layout from "../components/Layout";

export default function HomeScreen({ onNext }) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Stavební kalkulátor</h1>
        <p className="text-gray-500 mb-10 text-sm">Orientační rozpočet za pár minut.</p>
        <button
          onClick={onNext}
          className="bg-primary text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-primary-light transition-colors shadow-lg"
        >
          Vytvořit projekt
        </button>
      </div>
    </Layout>
  );
}
