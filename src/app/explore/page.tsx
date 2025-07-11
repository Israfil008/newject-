import Image from "next/image";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Define book type
type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

// Fetch books from Firestore
async function getBooks(): Promise<Book[]> {
  const booksRef = collection(db, "books");
  const q = query(booksRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      author: data.author,
      price: data.price,
      description: data.description || "",
      imageUrl: data.imageUrl || "",
    };
  });
}

// Main page component
export default async function ExplorePage() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Explore Books</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.length === 0 && (
          <p className="text-center col-span-full text-gray-600">No books found.</p>
        )}

        {books.map((book) => (
          <Link
            key={book.id}
            href={`/book/${book.id}`}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition"
          >
            {book.imageUrl ? (
              <Image
                src={book.imageUrl}
                alt={`${book.title} cover`}
                width={300}
                height={192}
                className="rounded-md mb-4 object-cover"
              />
            ) : (
              <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
            <p className="mt-auto font-semibold text-blue-600">Rs {book.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
