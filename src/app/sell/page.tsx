"use client";
import { useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !price) return;
    setLoading(true);
    await addDoc(collection(db, "books"), {
      title, author, price: Number(price), description: desc, imageUrl, createdAt: Timestamp.now()
    });
    setTitle(""); setAuthor(""); setPrice(""); setDesc(""); setImageUrl("");
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-md mx-auto min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Sell a Book</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        {/* form fields... */}
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}
