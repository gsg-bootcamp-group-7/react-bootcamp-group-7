import { createContext, useContext, type PropsWithChildren } from "react";
import { restProducts } from "./repositry/resetProducts";
import type { ProductsRepository } from "./repositry/ProductsRepository";

const ProductsContext = createContext<ProductsRepository | null>(null);

type ProductsProvidersProps = PropsWithChildren<{
  value: ProductsRepository;
}>;

export const ProductsProvider = ({
  value,
  children,
}: ProductsProvidersProps) => {
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === null) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

export const createProductsModule = () => {
  const value = restProducts();
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <ProductsProvider value={value}>{children}</ProductsProvider>
    ),
  };
};
