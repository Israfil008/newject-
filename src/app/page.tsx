import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-br from-blue-100 to-purple-100">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">Buy & Sell Used Books Easily</h2>
        <p className="text-lg sm:text-xl max-w-2xl mb-8 text-gray-700">
          Welcome to Nepal's most trusted platform for second-hand books. Explore, connect, and save today!
        </p>
        <a
          href="/explore"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300"
        >
          Explore Books
        </a>
      </section>
    </main>
  );
}
