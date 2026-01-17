import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  rem,
  ActionIcon,
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
    <Grid.Col span={4} key={product.id}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={product.image} height={160} alt={product.name} />
        </Card.Section>

        <Stack mt="md" mb="xs">
          <Group justify="space-between" align="flex-start">
            <Stack gap={rem(5)}>
              <Text fw={700} fz="lg">
                {product.name}
              </Text>
              <Group>
                <Text size="sm" c="dimmed">
                  {product.category}
                </Text>
                <Badge color={product.isAvailable ? "teal" : "red"}>
                  {product.isAvailable ? "In Stock" : "Out of Stock"}
                </Badge>
              </Group>
            </Stack>
          </Group>

          <Text size="sm" c="dimmed" lineClamp={2}>
            {product.description}
          </Text>

          <Group justify="space-between">
            <Text fw={700} fz="xl">
              ${product.price.toFixed(2)}
            </Text>
            <Group>
              <IconStarFilled
                style={{ width: rem(16), height: rem(16) }}
                color="orange"
              />
              <Text size="sm">{averageRating.toFixed(1)}</Text>
            </Group>
          </Group>
          {product.hasDiscounts && (
            <Badge
              style={{
                position: "absolute",
                top: rem(16),
                end: rem(1),
                opacity: 0.8,
              }}
              color="pink"
            >
              On Sale
            </Badge>
          )}
        </Stack>

        <Group align="center">
          <Button color="green" flex={1}>
            Order Now
          </Button>
          <ActionIcon
            variant="light"
            color="red"
            size="input-sm"
            onClick={() => deleteProduct(+product.id)}
          >
            <IconTrash style={{ width: rem(18), height: rem(18) }} />
          </ActionIcon>
        </Group>
      </Card>
    </Grid.Col>
  );
};
