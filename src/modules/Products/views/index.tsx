import { Grid, Title, Stack, Pagination, Center } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { Product } from "./Product";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 8;

export const Products = () => {
  const {
    isEmpty,
    products,
    productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10,
    isLoading,
  } = useGetAllProducts();
  const iconStyle = { width: rem(12), height: rem(12) };

  if (isLoading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </Container>
    );
  }

  const [activePage, setActivePage] = useState(1);

  if (isEmpty) {
    return (
      <Stack align="center" mt="xl">
        <Title order={3} c="dimmed">
          No products available
        </Title>
      </Stack>
    );
  }


  const allProducts = [
    ...productsWithDiscountHigherThan10,
    ...productsWithDiscountLowerThan10,
  ];

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const start = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = allProducts.slice(start, start + ITEMS_PER_PAGE);


  useEffect(() => {
    if (paginatedProducts.length === 0 && activePage > 1) {
      setActivePage((prev) => prev - 1);
    }
  }, [paginatedProducts.length, activePage]);

  return (
    <Stack gap="xl">
      <Title order={2} size="h1" ta="center" c="dark.8" mb="sm">
        Our Collection
      </Title>

      <Grid gutter="xl">
        {paginatedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Grid>

      {totalPages > 1 && (
        <Center mt="xl">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
            size="lg"
            radius="md"
            withEdges
            color="indigo" 
          />
        </Center>
      )}
    </Stack>
  );
};
