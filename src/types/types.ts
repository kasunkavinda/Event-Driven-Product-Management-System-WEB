export type LowStockWarningEvent = {
  type: "LowStockWarning";
  ts: string;
  sellerId: string;
  productId: number;
  payload: {
    id: number;
    quantity: number;
    threshold: number;
  };
};

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
};
