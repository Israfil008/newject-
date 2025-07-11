import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Link from "next/link";

export default async function ExplorePage() {
  const snapshot = await getDocs(collection(db, "books"));
  const books = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Explore Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <Link key={book.id} href={`/book/${book.id}`} className="bg-white p-4 rounded shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-blue-700 font-bold">Rs {book.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
