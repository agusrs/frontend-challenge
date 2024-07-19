export interface Category {
  id: string;
  name: string;
}

interface Price {
  currency: string | null;
  decimals: number | null;
  amount: number;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string | null;
  condition: "new" | "used";
  free_shipping: boolean;
  location: string | null;
}

export interface ItemDetail {
  id: string;
  title: string;
  price: Price;
  picture: string | null;
  condition: "new" | "used";
  free_shipping: boolean;
  sold_quantity: number | null;
  description: string | null;
  categories: Category[];
}
