'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
};

export default function ExplorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Book, 'id'>),
      }));
      setBooks(booksList);
      setLoading(false);
    }

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading books...</p>;

  if (books.length === 0)
    return <p className="text-center mt-10">No books found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map(book => (
          <div
            key={book.id}
            className="bg-[#1a1f1e] p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-sm">Author: {book.author}</p>
            <p className="text-sm mb-4">Price: {book.price}</p>
            <Link href={`/book/${book.id}`}>
              <span className="text-sm underline text-accent cursor-pointer">
                View Details
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
