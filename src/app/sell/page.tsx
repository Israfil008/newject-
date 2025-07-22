'use client';

import { useState } from 'react';
import { db } from '@/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function SellPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'books'), { title, author, price });
    alert('New book added!');
    setTitle('');
    setAuthor('');
    setPrice('');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sell a Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
