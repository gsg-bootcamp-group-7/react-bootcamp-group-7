import { toProduct } from "../adapters/toProduct";
import type { Product } from "../entities/Product";
import type { ProductsRepository } from "./ProductsRepository";

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (): Promise<Product[]> => {
      const response = await fetch(Base_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
console.log("API DATA:", data);
console.log("PRODUCTS:", data.products);
return toProduct(data.products);
      // return response.json().then((data) => toProduct(data.products));
    },
    delete:async (id:number): Promise<void> => {
      const response = await fetch(`${Base_URL}/${id}`,{
        method:'DELETE'
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return;
    },
  };
};
