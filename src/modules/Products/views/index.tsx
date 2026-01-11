import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

export const Products = () => {
  const { products } = useGetAllProducts();
  console.log(products);
  return (
    <>
      <Title>Browse Products</Title>

      <SimpleGrid
        cols={{
          sm: 2,
          md: 3,
          lg: 4,
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image src={product.image} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{product.name}</Text>
              {product.isAvailable && <Badge color="pink">On Sale</Badge>}
            </Group>

            <Text size="sm" mb="md" c="dimmed">
              {product.description}
            </Text>

            <Button color="blue" fullWidth mt="md" mt="auto" radius="md">
              Order now
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};
