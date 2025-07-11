"use client";

import { useState } from "react";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !price.trim()) {
      alert("Please fill in all required fields: Title, Author, and Price.");
      return;
    }

    alert(
      `Book submitted:\nTitle: ${title}\nAuthor: ${author}\nPrice: Rs ${price}\nDescription: ${description}\nImage URL: ${imageUrl}`
    );

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
        {/* Form fields here as before */}
        {/* ... */}
      </form>
    </main>
  );
}
