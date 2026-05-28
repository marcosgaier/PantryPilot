import React from "react";
import { useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import ExportSummaryButton from "../components/ExportSummaryButton.jsx";
import FilterBar from "../components/FilterBar.jsx";
import InventoryForm from "../components/InventoryForm.jsx";
import InventoryList from "../components/InventoryList.jsx";
import { useInventory } from "../hooks/useInventory.js";

export default function InventoryPage() {
  const {
    items,
    visibleItems,
    filters,
    addItem,
    updateItem,
    deleteItem,
    updateFilters,
  } = useInventory();
  const [editingItem, setEditingItem] = useState(null);

  function handleSubmit(item) {
    if (editingItem) {
      updateItem(item);
      setEditingItem(null);
      return;
    }

    addItem(item);
  }

  function handleDelete(itemId) {
    deleteItem(itemId);

    if (editingItem?.id === itemId) {
      setEditingItem(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-5 text-slate-900">
      <div className="mx-auto grid w-full max-w-3xl gap-5">
        <header className="grid gap-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-800">
            Pantry · Freezer · Heladera
          </p>
          <h1 className="text-3xl font-black leading-tight text-slate-950">
            Inventario de cocina
          </h1>
          <p className="text-base text-slate-600">
            Registrá lo que tenés, priorizá qué usar primero y copiá un resumen para planear comidas.
          </p>
        </header>

        <ExportSummaryButton items={items} />
        <Dashboard items={items} />
        <InventoryForm
          editingItem={editingItem}
          onCancelEdit={() => setEditingItem(null)}
          onSubmit={handleSubmit}
        />
        <FilterBar filters={filters} onFiltersChange={updateFilters} />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-950">Inventario</h2>
          <p className="text-sm font-semibold text-slate-500">{visibleItems.length} visibles</p>
        </div>

        <InventoryList items={visibleItems} onDelete={handleDelete} onEdit={setEditingItem} />
      </div>
    </main>
  );
}
