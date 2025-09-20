"use client";

import { Product } from "@/types/types";
import React from "react";

type Props = {
  data: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void | Promise<void>;
};

export default function ProductsTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Category</th>
            <th className="px-3 py-2 text-right">Price</th>
            <th className="px-3 py-2 text-right">Qty</th>
            <th className="px-3 py-2 w-40 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                No products
              </td>
            </tr>
          ) : (
            data.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2 text-gray-600">{p.category}</td>
                <td className="px-3 py-2 text-right">
                  ${Number(p.price).toFixed(2)}
                </td>
                <td className="px-3 py-2 text-right">{p.quantity}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2 justify-end">
                    <button
                      className="px-2 py-1 rounded border"
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-red-600 text-white"
                      onClick={async () => {
                        if (confirm(`Delete "${p.name}"?`))
                          await onDelete(p.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
