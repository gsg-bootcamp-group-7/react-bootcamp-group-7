export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  stock: number;
  reviews: Review[];
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmainl: string;
};
