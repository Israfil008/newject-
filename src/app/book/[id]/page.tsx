'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Book } from '../../../types';


const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, 'books', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBook({ id: docSnap.id, ...docSnap.data() } as Book);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>By {book.author}</p>
      <p>Price: Rs. {book.price}</p>
      {book.description && <p>{book.description}</p>}
      {book.imageUrl && <img src={book.imageUrl} alt={book.title} />}
    </div>
  );
};

export default BookDetailPage;
