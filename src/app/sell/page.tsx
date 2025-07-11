"use client"; // Because we'll use React hooks

import { useState } from "react";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !price.trim()) {
      alert("Please fill in all required fields: Title, Author, and Price.");
      return;
    }

    // For now just log the data or alert it
    alert(`Book submitted:\nTitle: ${title}\nAuthor: ${author}\nPrice: Rs ${price}\nDescription: ${description}\nImage URL: ${imageUrl}`);

    // Reset form
    setTitle("");
    setAuthor("");
    setPrice("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Sell Your Book</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block font-semibold mb-2">Book Title <span className="text-red-600">*</span></label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block font-semibold mb-2">Author <span className="text-red-600">*</span></label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-semibold mb-2">Price (Rs) <span className="text-red-600">*</span></label>
          <input
            id="price"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-2">Description</label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block font-semibold mb-2">Book Cover Image URL</label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/cover.jpg"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Submit Book
        </button>
      </form>
    </main>
  );
}
