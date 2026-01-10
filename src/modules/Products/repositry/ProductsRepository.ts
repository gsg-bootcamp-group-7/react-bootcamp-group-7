import type { Product } from "../Types/product";

export interface ProductsRepository {
  getAll: () => Promise<Product[]>;
}
