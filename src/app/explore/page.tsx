const books = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    price: 1200,
    thumbnail: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 950,
    thumbnail: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: 3,
    title: "Physics for Scientists and Engineers",
    author: "Raymond A. Serway",
    price: 1500,
    thumbnail: "https://covers.openlibrary.org/b/id/8234201-L.jpg",
  },
  {
    id: 4,
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth Rosen",
    price: 1300,
    thumbnail: "https://covers.openlibrary.org/b/id/8099253-L.jpg",
  },
];

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Explore Books
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <img
              src={book.thumbnail}
              alt={`${book.title} cover`}
              className="h-48 w-full object-cover rounded-md mb-4"
              loading="lazy"
            />
            <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
            <p className="mt-auto font-semibold text-blue-600">Rs {book.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
