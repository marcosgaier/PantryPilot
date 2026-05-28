import React from "react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { buildInventorySummary } from "../utils/inventorySummary.js";

export default function ExportSummaryButton({ items }) {
  const [copied, setCopied] = useState(false);

  async function handleCopySummary() {
    const summary = buildInventorySummary(items);
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-center font-bold text-white shadow-soft transition active:scale-[0.99]"
      onClick={handleCopySummary}
      type="button"
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {copied ? "Resumen copiado" : "Copiar resumen para ChatGPT"}
    </button>
  );
}
