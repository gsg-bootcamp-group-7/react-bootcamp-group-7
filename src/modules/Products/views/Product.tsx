import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Text,
  Stack,
  Rating,
  Box,
} from "@mantine/core";
import type { Product as ProductProps } from "../entities/Product";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { IconStarFilled, IconTrash } from "@tabler/icons-react";

const getAverageRating = (reviews: ProductProps["reviews"]) => {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / reviews.length;
};

export const Product = ({ product }: { product: ProductProps }) => {
  const { deleteProduct, isSuccess } = useDeleteProduct({
    onSuccess: () => {
      console.log("Product deleted successfully");
    },
  });

  if (isSuccess) {
    return null;
  }

  const averageRating = getAverageRating(product.reviews);

  return (
    <Grid.Col span={{ base: 12, xs: 6, md: 4, lg: 3 }} key={product.id}>
      <Card
        shadow="xs"
        padding="md"
        radius="lg"
        withBorder={false}
        h="100%"
        className="product-card"
        style={{ cursor: "pointer", backgroundColor: "#fff" }}
      >
        <Card.Section className="product-image-container">
          <Image
            src={product.image}
            height={180}
            alt={product.name}
            fit="cover"
            className="product-image-transition"
          />
          {product.discountPercentage > 10 && (
            <Badge
              color="red"
              variant="filled"
              size="md"
              radius="sm"
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
            >
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </Card.Section>

        <Stack mt="md" gap="xs" justify="space-between" style={{ flex: 1 }}>
          <Box>
            <Group justify="space-between" wrap="nowrap" align="start">
              <Text fw={700} size="md" lineClamp={1} c="dark.8" title={product.name}>
                {product.name}
              </Text>
            </Group>

            <Group gap={8} mt={4}>
              <Text size="xs" c="dimmed">Category</Text>
              {product.isAvailable ? (
                <Badge color="teal" variant="light" size="xs">In Stock</Badge>
              ) : (
                <Badge color="gray" variant="light" size="xs">Sold Out</Badge>
              )}
            </Group>

            <Text size="sm" c="dimmed" lineClamp={2} mt="xs" lh={1.4}>
              {product.description}
            </Text>
          </Box>

          <Stack gap="xs" mt="md">
            <Button
              fullWidth
              size="sm"
              radius="md"
              color="dark"
              variant="outline"
              style={{ border: '1px solid #dee2e6' }}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              size="sm"
              radius="md"
              variant="light"
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(product.id);
              }}
            >
              Remove
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Grid.Col>
  );
};
