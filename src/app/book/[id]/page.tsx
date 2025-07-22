'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    async function fetchBook() {
      const docRef = doc(db, 'books', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBook(docSnap.data());
      }
    }
    fetchBook();
  }, [id]);

  if (!book) return <p className="text-center mt-10">Loading book details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg mb-2">Author: {book.author}</p>
      <p className="text-lg mb-2">Price: {book.price}</p>
    </div>
  );
}