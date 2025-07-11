"use client"; // remove if page is server-only (likely you want server-side here)

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Image from "next/image";

interface Book {
  title: string;
  author: string;
  price: string;
  imageUrl?: string;
  description?: string;
}

interface PageParams {
  id: string;
}

interface Props {
  params: PageParams;
}

// Next.js expects page components to be async functions with params
export default async function BookPage({ params }: Props) {
  const { id } = params;

  // Fetch book from Firestore
  const bookRef = doc(db, "books", id);
  const docSnap = await getDoc(bookRef);

  if (!docSnap.exists()) {
    return <div className="p-10 text-center text-red-600">Book not found!</div>;
  }

  const bookData = docSnap.data() as Book;

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{bookData.title}</h1>
        <p className="mb-2 text-gray-700"><strong>Author:</strong> {bookData.author}</p>
        <p className="mb-2 text-gray-700"><strong>Price:</strong> NPR {bookData.price}</p>
        {bookData.imageUrl && (
          <Image
            src={bookData.imageUrl}
            alt={bookData.title}
            width={400}
            height={500}
            className="rounded-md mb-4 object-contain"
          />
        )}
        {bookData.description && (
          <p className="text-gray-600">{bookData.description}</p>
        )}
      </div>
    </main>
  );
}
