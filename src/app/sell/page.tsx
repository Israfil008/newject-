import Navbar from "@/components/Navbar";

export default function SellPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Sell Your Book</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Book Title"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Author"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price (Rs.)"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </main>
  );
}
