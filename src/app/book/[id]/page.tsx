import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";

type Book = {
  title: string;
  author: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const docRef = doc(db, "books", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound();
  }

  const book = docSnap.data() as Book;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={`${book.title} cover`}
            width={500}
            height={300}
            className="rounded-md object-cover mb-6"
          />
        ) : (
          <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 mb-6">
            No Image Available
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
        <h2 className="text-xl text-gray-700 mb-4">by {book.author}</h2>
        <p className="text-lg text-blue-600 font-semibold mb-4">Price: Rs {book.price}</p>
        {book.description && (
          <p className="text-gray-700 leading-relaxed">{book.description}</p>
        )}
      </div>
    </main>
  );
}
