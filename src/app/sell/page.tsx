'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export default function SellBook() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleImageUpload = async (): Promise<string> => {
    if (!image) throw new Error('No image selected');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'unsigned_preset'); // Replace with your Cloudinary preset

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please log in to upload a book');
      return;
    }

    try {
      if (!image) {
        alert('Please select an image');
        return;
      }

      const imageUrl = await handleImageUpload();

      await addDoc(collection(db, 'books'), {
        title,
        author,
        price: parseFloat(price),
        imageUrl,
        sellerId: currentUser.uid,
        createdAt: Timestamp.now(),
      });

      alert('Book uploaded!');
      router.push('/explore');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Unknown error');
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sell a Book 📚</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Book Title"
          className="p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          className="p-2 border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (Rs)"
          className="p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Upload Book
        </button>
      </form>
    </div>
  );
}
