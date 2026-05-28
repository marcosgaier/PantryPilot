import React from "react";
import EmptyState from "./EmptyState.jsx";
import InventoryItem from "./InventoryItem.jsx";

export default function InventoryList({ items, onDelete, onEdit }) {
  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="grid gap-3">
      {items.map((item) => (
        <InventoryItem key={item.id} item={item} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </section>
  );
}
