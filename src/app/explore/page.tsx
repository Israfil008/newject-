'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}

export default function ExplorePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const q = query(collection(db, 'books'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data: Book[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Book, 'id'>),
      }));
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Books 📚</h1>
      {books.length === 0 ? (
        <p>No books uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border rounded p-4 shadow hover:shadow-lg">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-48 w-full object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-blue-600 font-bold">Rs. {book.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
