import { useProducts } from "..";
import type { Product } from "../entities/Product";
import { useState, useEffect } from "react";

export const useGetAllProducts = () => {
  const { getAll } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAll().then((products) => setProducts(products));
  }, []);

  return { products };
};
