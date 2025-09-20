"use client";
import { useEffect, useState } from "react";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api-client";
import { useLowStockStream } from "./hooks/useSSE";
import ProductsTable from "@/components/ProductsTable";
import ProductModal from "@/components/ProductModal";
import NotificationsPanel from "@/components/NotificationsPanel";
import { Product } from "@/types/types";
import toast from "react-hot-toast";
import ExportButton from "@/components/ExportButton";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const alerts = useLowStockStream();

  async function refresh() {
    setProducts(await listProducts());
  }
  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="grid grid-cols-[1fr_320px] gap-4 p-4">
      <div>
        <div className="flex justify-between mb-2">
          <h1 className="text-xl font-semibold">Products</h1>
          <button
            className="px-3 py-1 rounded bg-yellow-700 text-white"
            onClick={() =>
              setEditing({
                id: 0,
                name: "",
                price: 0,
                quantity: 0,
                category: "",
              })
            }
          >
            Add product
          </button>
          <ExportButton />
        </div>
        <ProductsTable
          data={products}
          onEdit={(p) => setEditing(p)}
          onDelete={async (id) => {
            await deleteProduct(id);
            await refresh();
          }}
        />
      </div>
      <NotificationsPanel items={alerts} />
      {editing && (
        <ProductModal
          value={editing}
          onClose={() => setEditing(null)}
          onSave={async (val) => {
            if (val.id) {
              const res = await updateProduct(val.id, val);
              if (!res.success) {
                toast.error(res.error ?? "Update failed");
              } else {
                toast.success("Updated");
              }
            } else {
              const res = await createProduct(val);
              if (!res.success) {
                toast.error(res.error ?? "Create failed");
              } else {
                toast.success("Created");
              }
            }
            setEditing(null);
            await refresh();
          }}
        />
      )}
    </div>
  );
}
