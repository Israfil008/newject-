// src/app/explore/page.tsx
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  imageUrl?: string;
}

export default async function ExplorePage() {
  const booksCol = collection(db, "books");
  const booksSnapshot = await getDocs(booksCol);

  const books: Book[] = booksSnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Book, "id">),
  }));

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Explore Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map(book => (
          <Link
            key={book.id}
            href={`/book/${book.id}`}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-800 font-bold">NPR {book.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
