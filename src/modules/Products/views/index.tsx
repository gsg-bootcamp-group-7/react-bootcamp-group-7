import { Grid, Title, Loader, Tabs, rem, Container } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { Product } from "./Product";
import {
  IconDiscount,
  IconDiscountOff,
  IconList,
} from "@tabler/icons-react";

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

  if (isEmpty) {
    return <Title> No products available </Title>;
  }

  return (
    <Container>
      <Tabs defaultValue="all">
        <Tabs.List>
          <Tabs.Tab value="all" leftSection={<IconList style={iconStyle} />}>
            All
          </Tabs.Tab>
          <Tabs.Tab
            value="high-discount"
            leftSection={<IconDiscount style={iconStyle} />}
          >
            High Discount
          </Tabs.Tab>
          <Tabs.Tab
            value="low-discount"
            leftSection={<IconDiscountOff style={iconStyle} />}
          >
            Low Discount
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all" pt="lg">
          <Grid>
            {products.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="high-discount" pt="lg">
          <Grid>
            {productsWithDiscountHigherThan10.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="low-discount" pt="lg">
          <Grid>
            {productsWithDiscountLowerThan10.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};