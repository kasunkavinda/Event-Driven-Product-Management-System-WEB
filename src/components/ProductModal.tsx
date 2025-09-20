"use client";

import { Product } from "@/types/types";
import { toNum } from "@/util/util";
import React, { useEffect, useState } from "react";

type EditValue = Partial<Product>;
type Props = {
  value: EditValue;
  onClose: () => void;
  onSave: (val: EditValue) => void | Promise<void>;
};

export default function ProductModal({ value, onClose, onSave }: Props) {
  const [form, setForm] = useState<EditValue>({
    id: value.id,
    name: value.name ?? "",
    price: toNum(value.price),

    quantity: toNum(value.quantity),
    category: value.category ?? "",
  });

  useEffect(() => {
    setForm({
      id: value.id,
      name: value.name ?? "",
      price: toNum(value.price),
      quantity: toNum(value.quantity),
      category: value.category ?? "",
    });
  }, [value]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">
            {form.id ? "Edit product" : "Add product"}
          </h2>
          <button
            className="text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const name = (form.name ?? "").trim();
            if (!name) return alert("Name is required");
            const price = toNum(form.price);
            if (price < 0) return alert("Price must be ≥ 0");
            const quantity = toNum(form.quantity);
            if (!Number.isFinite(quantity)) return alert("Quantity invalid");

            await onSave({ ...form, price, quantity });
          }}
          className="space-y-3 text-gray-600"
        >
          <label className="block">
            <span className="text-sm text-gray-700">Name</span>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              value={form.name ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm text-gray-700">Price</span>
              <input
                type="number"
                step="0.01"
                min={0}
                className="mt-1 w-full rounded border px-3 py-2"
                value={form.price ?? 0}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Number(e.target.value) }))
                }
                required
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700">Quantity</span>
              <input
                type="number"
                step="1"
                min={0}
                className="mt-1 w-full rounded border px-3 py-2"
                value={form.quantity ?? 0}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantity: Number(e.target.value) }))
                }
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm text-gray-700">Category</span>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              value={form.category ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
            />
          </label>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-2 rounded border"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 rounded bg-black text-white"
            >
              {form.id ? "Save changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
