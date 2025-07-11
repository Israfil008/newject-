import Image from "next/image";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase";

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

async function getBooks(): Promise<Book[]> {
  const booksCol = collection(db, "books");
  const q = query(booksCol, orderBy("createdAt", "desc"));
  const bookSnapshot = await getDocs(q);
  const books: Book[] = bookSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      author: data.author,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl,
    };
  });
  return books;
}

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
          <div key={book.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            {book.imageUrl ? (
              <Image
                src={book.imageUrl}
                alt={`${book.title} cover`}
                width={300}
                height={192}
                className="rounded-md mb-4 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
            <p className="mt-auto font-semibold text-blue-600">Rs {book.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
