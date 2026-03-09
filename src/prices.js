export const PRICES = {
  materials: {
    floor_tile: { economy: 350, standard: 750, premium: 1800 },
    wall_tile: { economy: 300, standard: 650, premium: 1500 },
    natural_stone: { economy: 800, standard: 1500, premium: 3500 },
    vinyl: { economy: 250, standard: 500, premium: 1200 },
  },
  sanitary: {
    bathtub: { economy: 4000, standard: 9000, premium: 25000 },
    shower: { economy: 3000, standard: 7000, premium: 18000 },
    sink: { economy: 1500, standard: 4000, premium: 12000 },
    sink_double: { economy: 2500, standard: 7000, premium: 20000 },
    toilet: { economy: 2000, standard: 5000, premium: 15000 },
  },
  labor_hours: {
    demolition: 4,
    tiling_per_m2: 0.8,
    plumbing_base: 6,
    electric_base: 3,
  },
  location_multiplier: {
    praha: 1.3,
    velke_mesto: 1.1,
    venkov: 1.0,
  },
};

export const DEFAULT_HOURLY_RATE = 500;

export const MATERIAL_CLASS_LABELS = {
  economy: "Economy",
  standard: "Standard",
  premium: "Premium",
};

export const LOCATION_LABELS = {
  praha: "Praha",
  velke_mesto: "Střední Čechy / velké město",
  venkov: "Menší město / venkov",
};
