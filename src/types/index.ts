// src/types/index.ts

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  imageUrl?: string;
}
