import React, { useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import ProgressBar from "../components/ProgressBar";
import { PRICES } from "../prices";

const TOTAL_STEPS = 8;

function StepShower({ value, onChange }) {
  const opts = [
    { id: "vana", icon: "🛁", label: "Vana" },
    { id: "sprcha", icon: "🚿", label: "Sprchový kout" },
    { id: "oboje", icon: "🛁🚿", label: "Oboje" },
  ];
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Co preferujete pro sprchování?</h2>
      <div className="grid grid-cols-3 gap-3">
        {opts.map((o) => (
          <Tile key={o.id} icon={o.icon} label={o.label} selected={value === o.id} onClick={() => onChange(o.id)} />
        ))}
      </div>
    </>
  );
}

function StepSink({ value, onChange }) {
  const opts = [
    { id: "klasicke", label: "Klasické" },
    { id: "nabytkove", label: "Nábytkové" },
    { id: "dvojite", label: "Dvojité" },
  ];
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Jaké umyvadlo?</h2>
      <div className="grid grid-cols-3 gap-3">
        {opts.map((o) => (
          <Tile key={o.id} label={o.label} selected={value === o.id} onClick={() => onChange(o.id)} />
        ))}
      </div>
    </>
  );
}

function StepToilet({ value, onChange }) {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Součástí koupelny je i WC?</h2>
      <div className="grid grid-cols-2 gap-3">
        <Tile label="Ano" selected={value === "ano"} onClick={() => onChange("ano")} />
        <Tile label="Ne" selected={value === "ne"} onClick={() => onChange("ne")} />
      </div>
    </>
  );
}

function StepFloor({ value, onChange }) {
  const opts = [
    { id: "keramicka", label: "Keramická dlažba" },
    { id: "vinyl", label: "Vinylová podlaha" },
    { id: "kamen", label: "Přírodní kámen" },
  ];
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Typ podlahy?</h2>
      <div className="grid grid-cols-1 gap-3">
        {opts.map((o) => (
          <Tile key={o.id} label={o.label} selected={value === o.id} onClick={() => onChange(o.id)} />
        ))}
      </div>
    </>
  );
}

function StepWalls({ value, onChange }) {
  const opts = [
    { id: "cele", label: "Celé stěny" },
    { id: "castecne", label: "Částečně (do výšky 1,5 m)" },
    { id: "za_sprchou", label: "Pouze za sprchou/vanou" },
  ];
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Obklady stěn?</h2>
      <div className="grid grid-cols-1 gap-3">
        {opts.map((o) => (
          <Tile key={o.id} label={o.label} selected={value === o.id} onClick={() => onChange(o.id)} />
        ))}
      </div>
    </>
  );
}

function StepMaterialClass({ value, onChange }) {
  const getMinPrice = (cls) => {
    const s = PRICES.sanitary;
    const m = PRICES.materials;
    return m.floor_tile[cls] * 6 + m.wall_tile[cls] * 10 + s.bathtub[cls] + s.sink[cls];
  };
  const opts = [
    { id: "economy", icon: "💰", label: "Economy", sub: `od ${Math.round(getMinPrice("economy")).toLocaleString("cs-CZ")} Kč` },
    { id: "standard", icon: "✨", label: "Standard", sub: `od ${Math.round(getMinPrice("standard")).toLocaleString("cs-CZ")} Kč` },
    { id: "premium", icon: "👑", label: "Premium", sub: `od ${Math.round(getMinPrice("premium")).toLocaleString("cs-CZ")} Kč` },
  ];
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Jaká je vaše preference materiálů?</h2>
      <div className="grid grid-cols-3 gap-3">
        {opts.map((o) => (
          <Tile key={o.id} icon={o.icon} label={o.label} selected={value === o.id} onClick={() => onChange(o.id)}>
            <span className="text-xs mt-1 opacity-75">{o.sub}</span>
          </Tile>
        ))}
      </div>
    </>
  );
}

function StepWorks({ value, onChange }) {
  const opts = [
    { id: "bouraci", label: "Bourací práce" },
    { id: "rozvody_vody", label: "Rozvody vody" },
    { id: "elektro", label: "Elektroinstalace" },
    { id: "vymalba", label: "Výmalba/sádrokarton" },
  ];
  const toggle = (id) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Co vše se bude měnit?</h2>
      <p className="text-sm text-gray-500 mb-3">Vyberte vše, co platí:</p>
      <div className="grid grid-cols-2 gap-3">
        {opts.map((o) => (
          <Tile key={o.id} label={o.label} selected={value.includes(o.id)} onClick={() => toggle(o.id)} />
        ))}
      </div>
    </>
  );
}

function StepLocation({ value, onChange }) {
  const opts = [
    { id: "praha", label: "Praha" },
    { id: "velke_mesto", label: "Střední Čechy / velké město" },
    { id: "venkov", label: "Menší město / venkov" },
  ];
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Kde se nachází nemovitost?</h2>
      <div className="grid grid-cols-1 gap-3">
        {opts.map((o) => (
          <Tile key={o.id} label={o.label} selected={value === o.id} onClick={() => onChange(o.id)} />
        ))}
      </div>
    </>
  );
}

export default function WizardScreen({ project, setProject, onComplete, onBack }) {
  const [step, setStep] = useState(1);

  const update = (key) => (val) => setProject((p) => ({ ...p, [key]: val }));

  const canNext = () => {
    switch (step) {
      case 1: return !!project.shower;
      case 2: return !!project.sink;
      case 3: return !!project.toilet;
      case 4: return !!project.floor;
      case 5: return !!project.walls;
      case 6: return !!project.materialClass;
      case 7: return project.works.length > 0;
      case 8: return !!project.location;
      default: return false;
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else onComplete();
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <StepShower value={project.shower} onChange={update("shower")} />;
      case 2: return <StepSink value={project.sink} onChange={update("sink")} />;
      case 3: return <StepToilet value={project.toilet} onChange={update("toilet")} />;
      case 4: return <StepFloor value={project.floor} onChange={update("floor")} />;
      case 5: return <StepWalls value={project.walls} onChange={update("walls")} />;
      case 6: return <StepMaterialClass value={project.materialClass} onChange={update("materialClass")} />;
      case 7: return <StepWorks value={project.works} onChange={update("works")} />;
      case 8: return <StepLocation value={project.location} onChange={update("location")} />;
      default: return null;
    }
  };

  return (
    <Layout onBack={back}>
      <ProgressBar current={step} total={TOTAL_STEPS} />
      {renderStep()}
      <button
        disabled={!canNext()}
        onClick={next}
        className={`mt-8 w-full py-3 rounded-xl text-lg font-semibold transition-colors ${
          canNext() ? "bg-primary text-white hover:bg-primary-light" : "bg-disabled text-gray-400 cursor-not-allowed"
        }`}
      >
        {step === TOTAL_STEPS ? "Zobrazit výsledek" : "Pokračovat"}
      </button>
    </Layout>
  );
}
