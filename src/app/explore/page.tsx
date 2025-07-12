'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
};

const ExplorePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    const booksCol = collection(db, 'books');
    const booksSnapshot = await getDocs(booksCol);

    if (booksSnapshot.empty) {
      // Seed dummy books
      const dummyBooks = [
        { title: 'Intro to AI', author: 'Andrew Ng', price: 500 },
        { title: 'Learn TypeScript', author: 'Max Schwarzmüller', price: 750 },
        { title: 'Next.js in Action', author: 'Vercel Team', price: 900 },
      ];
      for (const book of dummyBooks) {
        await addDoc(booksCol, book);
      }
      alert('Books seeded. Refresh to see them.');
      setLoading(false);
      return;
    }

    const fetchedBooks = booksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Book[];

    setBooks(fetchedBooks);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Explore Books</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {books.map(book => (
            <Link key={book.id} href={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h2 style={{ margin: '0 0 0.5rem' }}>{book.title}</h2>
                <p style={{ margin: '0.2rem 0' }}><strong>Author:</strong> {book.author}</p>
                <p style={{ margin: '0.2rem 0' }}><strong>Price:</strong> Rs. {book.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
