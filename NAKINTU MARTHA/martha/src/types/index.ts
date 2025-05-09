export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  color?: string;
  imageUrl?: string;
}

export interface ProductInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
  color?: string;
  image: File | null;
}