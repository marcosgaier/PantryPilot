import React from "react";
import { AlertTriangle, Boxes, ClipboardList, MapPin } from "lucide-react";
import { locations } from "../data/inventoryOptions.js";

export default function Dashboard({ items }) {
  const urgentItems = items.filter((item) => item.priority === "urgent");
  const useSoonItems = items.filter((item) => item.priority === "use_soon");
  const firstReviewTarget = urgentItems[0] || useSoonItems[0] || items[0];

  const locationCounts = locations.map((location) => ({
    ...location,
    count: items.filter((item) => item.location === location.value).length,
  }));

  return (
    <section className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={<Boxes size={18} />}
          label="Total items"
          value={items.length}
          tone="bg-white"
        />
        <MetricCard
          icon={<AlertTriangle size={18} />}
          label="Urgentes"
          value={urgentItems.length}
          tone={urgentItems.length > 0 ? "bg-red-50 text-red-800" : "bg-white"}
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <MapPin size={17} />
          Items por ubicación
        </div>
        <div className="grid grid-cols-3 gap-2">
          {locationCounts.map((location) => (
            <div key={location.value} className="rounded-md bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-500">{location.label}</p>
              <p className="text-lg font-bold text-slate-900">{location.count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
        <div className="flex items-start gap-3">
          <ClipboardList className="mt-0.5 shrink-0" size={18} />
          <div>
            <p className="text-sm font-semibold">Revisar primero</p>
            <p className="mt-1 text-sm">
              {firstReviewTarget
                ? `${firstReviewTarget.name} (${firstReviewTarget.priority === "urgent" ? "urgente" : firstReviewTarget.priority === "use_soon" ? "usar pronto" : "inventario general"})`
                : "Agregá tu primer item para empezar a priorizar."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon, label, value, tone }) {
  return (
    <div className={`rounded-lg border border-slate-200 p-4 shadow-soft ${tone}`}>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        {icon}
        {label}
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
