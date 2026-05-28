import React from "react";
import { PackagePlus } from "lucide-react";

export default function EmptyState() {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
      <PackagePlus className="mx-auto mb-3 text-slate-400" size={32} />
      <p className="font-semibold text-slate-800">No hay items para mostrar</p>
      <p className="mt-1 text-sm">Agregá algo o ajustá los filtros.</p>
    </section>
  );
}
