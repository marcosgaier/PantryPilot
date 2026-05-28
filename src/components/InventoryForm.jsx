import React from "react";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { categories, locations, priorities, units } from "../data/inventoryOptions.js";
import { getTodayIsoDate } from "../utils/dateFormat.js";

const emptyForm = {
  name: "",
  location: "freezer",
  category: "prepared_food",
  quantity: "",
  unit: "portions",
  approximateWeight: "",
  storedDate: getTodayIsoDate(),
  useByDate: "",
  priority: "normal",
  note: "",
};

export default function InventoryForm({ editingItem, onCancelEdit, onSubmit }) {
  const [formValues, setFormValues] = useState(emptyForm);

  useEffect(() => {
    setFormValues(editingItem ? { ...emptyForm, ...editingItem, useByDate: editingItem.useByDate || "" } : emptyForm);
  }, [editingItem]);

  function updateField(field, value) {
    setFormValues((currentValues) => ({ ...currentValues, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formValues.name.trim() || !formValues.quantity) {
      return;
    }

    onSubmit({
      ...formValues,
      name: formValues.name.trim(),
      quantity: formValues.quantity.toString().trim(),
      approximateWeight: formValues.approximateWeight.trim(),
      note: formValues.note.trim(),
    });

    if (!editingItem) {
      setFormValues(emptyForm);
    }
  }

  return (
    <form
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-950">
          {editingItem ? "Editar item" : "Agregar item"}
        </h2>
        {editingItem ? (
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-600"
            onClick={onCancelEdit}
            title="Cancelar edición"
            type="button"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      <TextField
        label="Nombre"
        required
        value={formValues.name}
        onChange={(value) => updateField("name", value)}
        placeholder="Ej: Goulash"
      />

      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Ubicación"
          value={formValues.location}
          onChange={(value) => updateField("location", value)}
          options={locations}
        />
        <SelectField
          label="Categoría"
          value={formValues.category}
          onChange={(value) => updateField("category", value)}
          options={categories}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Cantidad"
          required
          value={formValues.quantity}
          onChange={(value) => updateField("quantity", value)}
          placeholder="4"
          type="number"
        />
        <SelectField
          label="Unidad"
          value={formValues.unit}
          onChange={(value) => updateField("unit", value)}
          options={units}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Peso aprox."
          value={formValues.approximateWeight}
          onChange={(value) => updateField("approximateWeight", value)}
          placeholder="250 g"
        />
        <TextField
          label="Fecha"
          value={formValues.storedDate}
          onChange={(value) => updateField("storedDate", value)}
          type="date"
        />
      </div>

      <TextField
        label="Consumir antes de"
        value={formValues.useByDate}
        onChange={(value) => updateField("useByDate", value)}
        type="date"
      />

      <SelectField
        label="Prioridad"
        value={formValues.priority}
        onChange={(value) => updateField("priority", value)}
        options={priorities}
      />

      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Nota
        <textarea
          className="min-h-20 w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-base outline-none transition focus:border-teal-600 focus:bg-white"
          value={formValues.note}
          onChange={(event) => updateField("note", event.target.value)}
          placeholder="Ej: Comer con arroz, abierto, falta poco..."
        />
      </label>

      <button
        className="flex h-12 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 font-bold text-white shadow-soft transition active:scale-[0.99]"
        type="submit"
      >
        <Save size={18} />
        {editingItem ? "Guardar cambios" : "Agregar item"}
      </button>
    </form>
  );
}

function TextField({ label, value, onChange, placeholder, required = false, type = "text" }) {
  return (
    <label className="grid gap-1 text-sm font-medium text-slate-700">
      {label}
      <input
        className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-base outline-none transition focus:border-teal-600 focus:bg-white"
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="grid gap-1 text-sm font-medium text-slate-700">
      {label}
      <select
        className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-base outline-none transition focus:border-teal-600 focus:bg-white"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
