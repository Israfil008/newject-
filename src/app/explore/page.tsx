'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Book } from '../../types';
import Link from 'next/link';

const ExplorePage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksList: Book[] = [];
      querySnapshot.forEach((doc) => {
        booksList.push({ id: doc.id, ...doc.data() } as Book);
      });
      setBooks(booksList);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Explore Books</h1>
      {books.map((book) => (
        <Link href={`/book/${book.id}`} key={book.id}>
          <div>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>Rs. {book.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExplorePage;
