// src/app/explore/page.tsx
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Link from "next/link";
import { Book } from "../../types";

export default async function ExplorePage() {
  const snapshot = await getDocs(collection(db, "books"));
  const books: Book[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Book, "id">),
  }));

  return (
    <main className="page-container">
      <h1 className="text-center">Explore Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length ? books.map(book => (
          <Link href={`/book/${book.id}`} key={book.id}>
            <div className="card">
              <h2>{book.title}</h2>
              <p>by {book.author}</p>
              <p>Rs. {book.price}</p>
            </div>
          </Link>
        )) : (
          <p>No books found.</p>
        )}
      </div>
    </main>
  );
}
