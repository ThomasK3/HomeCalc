import { PRICES } from "./prices";

export function calculateBudget(project, hourlyRate = 500) {
  const { length, width, materialClass, location, shower, sink, toilet, floor, walls, works } = project;
  const area = length * width;
  const perimeter = 2 * (length + width);
  const wallHeight = 2.5;
  const wallArea = perimeter * wallHeight;
  const locMul = PRICES.location_multiplier[location] || 1.0;

  // --- MATERIALS ---
  // Floor
  let floorPricePerM2 = 0;
  let floorLabel = "";
  if (floor === "keramicka") {
    floorPricePerM2 = PRICES.materials.floor_tile[materialClass];
    floorLabel = "Keramická dlažba";
  } else if (floor === "vinyl") {
    floorPricePerM2 = PRICES.materials.vinyl[materialClass];
    floorLabel = "Vinylová podlaha";
  } else if (floor === "kamen") {
    floorPricePerM2 = PRICES.materials.natural_stone[materialClass];
    floorLabel = "Přírodní kámen";
  }
  const floorCost = Math.round(area * floorPricePerM2 * locMul);

  // Walls
  let wallTileArea = 0;
  let wallLabel = "";
  if (walls === "cele") {
    wallTileArea = wallArea;
    wallLabel = "Obklad celé stěny";
  } else if (walls === "castecne") {
    wallTileArea = perimeter * 1.5;
    wallLabel = "Obklad částečně (do 1,5 m)";
  } else if (walls === "za_sprchou") {
    wallTileArea = 4;
    wallLabel = "Obklad za sprchou/vanou";
  }
  const wallPricePerM2 = PRICES.materials.wall_tile[materialClass];
  const wallCost = Math.round(wallTileArea * wallPricePerM2 * locMul);

  // Sanitary
  const sanitaryItems = [];

  if (shower === "vana" || shower === "oboje") {
    const cost = Math.round(PRICES.sanitary.bathtub[materialClass] * locMul);
    sanitaryItems.push({ label: "Vana", cost });
  }
  if (shower === "sprcha" || shower === "oboje") {
    const cost = Math.round(PRICES.sanitary.shower[materialClass] * locMul);
    sanitaryItems.push({ label: "Sprchový kout", cost });
  }

  let sinkCost = 0;
  let sinkLabel = "Umyvadlo";
  if (sink === "klasicke" || sink === "nabytkove") {
    sinkCost = Math.round(PRICES.sanitary.sink[materialClass] * locMul);
    sinkLabel = sink === "klasicke" ? "Umyvadlo klasické" : "Umyvadlo nábytkové";
  } else if (sink === "dvojite") {
    sinkCost = Math.round(PRICES.sanitary.sink_double[materialClass] * locMul);
    sinkLabel = "Umyvadlo dvojité";
  }
  sanitaryItems.push({ label: sinkLabel, cost: sinkCost });

  let toiletCost = 0;
  if (toilet === "ano") {
    toiletCost = Math.round(PRICES.sanitary.toilet[materialClass] * locMul);
    sanitaryItems.push({ label: "WC", cost: toiletCost });
  }

  const otherMaterial = Math.round(1500 * locMul);

  const materialTotal =
    floorCost + wallCost + sanitaryItems.reduce((s, i) => s + i.cost, 0) + otherMaterial;

  // --- LABOR ---
  const laborItems = [];
  const totalTileArea = area + wallTileArea;

  if (works.includes("bouraci")) {
    const hours = PRICES.labor_hours.demolition;
    laborItems.push({ label: "Bourací práce", hours, cost: Math.round(hours * hourlyRate * locMul) });
  }

  const tilingHours = Math.round(totalTileArea * PRICES.labor_hours.tiling_per_m2 * 10) / 10;
  laborItems.push({ label: "Obkládání", hours: tilingHours, cost: Math.round(tilingHours * hourlyRate * locMul) });

  if (works.includes("rozvody_vody")) {
    const hours = PRICES.labor_hours.plumbing_base;
    laborItems.push({ label: "Instalatérské práce", hours, cost: Math.round(hours * hourlyRate * locMul) });
  }

  if (works.includes("elektro")) {
    const hours = PRICES.labor_hours.electric_base;
    laborItems.push({ label: "Elektro", hours, cost: Math.round(hours * hourlyRate * locMul) });
  }

  if (works.includes("vymalba")) {
    laborItems.push({ label: "Výmalba/sádrokarton", hours: 2, cost: Math.round(2 * hourlyRate * locMul) });
  }

  const laborTotal = laborItems.reduce((s, i) => s + i.cost, 0);

  const subtotal = materialTotal + laborTotal;
  const reserve = Math.round(subtotal * 0.1);
  const totalMin = subtotal + reserve;
  const totalMax = Math.round(totalMin * 1.25);

  return {
    area,
    materialItems: [
      { label: floorLabel, qty: `${area} m²`, unitPrice: floorPricePerM2, cost: floorCost },
      { label: wallLabel, qty: `${wallTileArea.toFixed(1)} m²`, unitPrice: wallPricePerM2, cost: wallCost },
      ...sanitaryItems.map((i) => ({ ...i, qty: null, unitPrice: null })),
      { label: "Ostatní materiál", qty: null, unitPrice: null, cost: otherMaterial },
    ],
    materialTotal,
    laborItems,
    laborTotal,
    reserve,
    totalMin,
    totalMax,
  };
}
