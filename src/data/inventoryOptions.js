export const locations = [
  { value: "freezer", label: "Freezer", heading: "FREEZER" },
  { value: "pantry", label: "Pantry", heading: "PANTRY" },
  { value: "fridge", label: "Heladera", heading: "HELADERA" },
];

export const categories = [
  { value: "prepared_food", label: "Comida preparada" },
  { value: "meat", label: "Carne" },
  { value: "vegetables", label: "Verduras" },
  { value: "legumes", label: "Legumbres" },
  { value: "carbs", label: "Carbohidratos" },
  { value: "dairy", label: "Lácteos" },
  { value: "condiments", label: "Condimentos" },
  { value: "other", label: "Otros" },
];

export const units = [
  { value: "portions", label: "porciones" },
  { value: "blocks", label: "bloques" },
  { value: "grams", label: "gramos", shortLabel: "g" },
  { value: "kilos", label: "kilos", shortLabel: "kg" },
  { value: "units", label: "unidades" },
  { value: "cans", label: "latas" },
  { value: "packages", label: "paquetes" },
];

export const priorities = [
  { value: "normal", label: "Normal", rank: 1 },
  { value: "use_soon", label: "Usar pronto", rank: 2 },
  { value: "urgent", label: "Urgente", rank: 3 },
];

export const sortOptions = [
  { value: "date_desc", label: "Fecha reciente" },
  { value: "date_asc", label: "Fecha antigua" },
  { value: "priority", label: "Prioridad" },
];
