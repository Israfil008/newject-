import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";  // Make sure this path matches your firebase.ts location
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

interface Book {
  title: string;
  author: string;
  price: string;
  imageUrl?: string;
  description?: string;
}

export default async function BookPage({ params }: PageProps) {
  const { id } = params;

  // Fetch the book document from Firestore by id
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
          <img
            src={bookData.imageUrl}
            alt={bookData.title}
            className="w-full max-w-sm rounded-md mb-4 object-contain"
          />
        )}
        {bookData.description && (
          <p className="text-gray-600">{bookData.description}</p>
        )}
      </div>
    </main>
  );
}
