"use client";

import React from "react";

export default function ExportButton() {
  const api = process.env.NEXT_PUBLIC_API!;
  const sellerId = process.env.SELLER_ID || "demo";

  const handleExport = async () => {
    try {
      const res = await fetch(`${api}/products/export`, {
        headers: {
          "x-seller-id": sellerId,
        },
      });
      if (!res.ok) throw new Error("Failed to export");

      // Get the CSV blob
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and click it
      const a = document.createElement("a");
      a.href = url;
      a.download = "products.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Cleanup
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
    >
      Export Products CSV
    </button>
  );
}
