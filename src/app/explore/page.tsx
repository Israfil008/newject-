import Navbar from "@/components/Navbar";
import Image from "next/image";

const dummyBooks = [
  {
    id: 1,
    title: "Fundamentals of Physics",
    author: "Halliday, Resnick",
    price: "Rs. 500",
    image: "https://via.placeholder.com/300x160",
  },
  {
    id: 2,
    title: "Organic Chemistry",
    author: "Morrison & Boyd",
    price: "Rs. 650",
    image: "https://via.placeholder.com/300x160",
  },
  {
    id: 3,
    title: "Mathematics Grade 12",
    author: "HSEB",
    price: "Rs. 400",
    image: "https://via.placeholder.com/300x160",
  },
];

export default function ExploreBooks() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Explore Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyBooks.map((book) => (
            <div
              key={book.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition duration-300 bg-white"
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={book.image}
                  alt={book.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
              <p className="text-blue-600 font-bold">{book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
