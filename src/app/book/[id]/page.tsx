import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const snap = await getDoc(doc(db, "books", params.id));
  if (!snap.exists()) notFound();
  const book = snap.data() as any;

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-700 mb-1">by {book.author}</p>
        <p className="text-blue-600 font-semibold mb-4">Rs {book.price}</p>
        {book.imageUrl && (
          <Image src={book.imageUrl} alt={book.title} width={400} height={300} />
        )}
        {book.description && <p className="mt-4 text-gray-700">{book.description}</p>}
      </div>
    </main>
  );
}
