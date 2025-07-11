import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = params;

  const docRef = doc(db, 'books', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound();
  }

  const book = docSnap.data();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-gray-700 mb-2">Author: {book.author}</p>
      <p className="text-gray-600">{book.description}</p>
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={book.title}
          className="mt-4 w-64 h-auto rounded shadow"
        />
      )}
    </div>
  );
}
