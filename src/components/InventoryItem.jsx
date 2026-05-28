import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import { categories, locations, priorities, units } from "../data/inventoryOptions.js";
import { formatDisplayDate } from "../utils/dateFormat.js";

const getLabel = (options, value) =>
  options.find((option) => option.value === value)?.label || value;

export default function InventoryItem({ item, onDelete, onEdit }) {
  const priorityLabel = getLabel(priorities, item.priority);
  const isUrgent = item.priority === "urgent";
  const isUseSoon = item.priority === "use_soon";

  return (
    <article
      className={`rounded-lg border bg-white p-4 shadow-soft ${
        isUrgent
          ? "border-red-300 ring-2 ring-red-100"
          : isUseSoon
            ? "border-amber-300 ring-2 ring-amber-100"
            : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-bold text-slate-950">{item.name}</h3>
          <p className="mt-1 text-sm text-slate-600">
            {getLabel(locations, item.location)} · {getLabel(categories, item.category)}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-600"
            onClick={() => onEdit(item)}
            title="Editar"
            type="button"
          >
            <Edit3 size={17} />
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-red-200 text-red-700"
            onClick={() => onDelete(item.id)}
            title="Eliminar"
            type="button"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <Badge>{`${item.quantity} ${getLabel(units, item.unit)}`}</Badge>
        {item.storedDate ? <Badge>{formatDisplayDate(item.storedDate)}</Badge> : null}
        {item.useByDate ? (
          <Badge>{`Consumir antes de: ${formatDisplayDate(item.useByDate)}`}</Badge>
        ) : null}
        {item.approximateWeight ? <Badge>{`Peso ${item.approximateWeight}`}</Badge> : null}
        <Badge tone={isUrgent ? "urgent" : isUseSoon ? "soon" : "normal"}>{priorityLabel}</Badge>
      </div>

      {item.note ? (
        <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">{item.note}</p>
      ) : null}
    </article>
  );
}

function Badge({ children, tone = "normal" }) {
  const toneClass =
    tone === "urgent"
      ? "bg-red-100 text-red-800"
      : tone === "soon"
        ? "bg-amber-100 text-amber-900"
        : "bg-slate-100 text-slate-700";

  return <span className={`rounded-md px-2.5 py-1 font-semibold ${toneClass}`}>{children}</span>;
}
