import { Category, Item, ItemDetail } from "./types";

export interface GetItemsResponse {
  author: {
    name: string;
    lastName: string;
  };
  categories: Category[];
  items: Item[];
  pagination: {
    total: number;
  };
}

export interface GetItemDetailResponse {
  author: {
    name: string;
    lastName: string;
  };
  item: ItemDetail;
}
