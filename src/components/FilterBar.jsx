import React from "react";
import { Search } from "lucide-react";
import { categories, locations, sortOptions } from "../data/inventoryOptions.js";

export default function FilterBar({ filters, onFiltersChange }) {
  return (
    <section className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <label className="relative block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-3 text-base outline-none transition focus:border-teal-600 focus:bg-white"
          value={filters.search}
          onChange={(event) => onFiltersChange({ search: event.target.value })}
          placeholder="Buscar por nombre"
          type="search"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Ubicación"
          value={filters.location}
          onChange={(location) => onFiltersChange({ location })}
          options={[{ value: "all", label: "Todas" }, ...locations]}
        />
        <SelectField
          label="Categoría"
          value={filters.category}
          onChange={(category) => onFiltersChange({ category })}
          options={[{ value: "all", label: "Todas" }, ...categories]}
        />
      </div>

      <SelectField
        label="Ordenar"
        value={filters.sortBy}
        onChange={(sortBy) => onFiltersChange({ sortBy })}
        options={sortOptions}
      />
    </section>
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
