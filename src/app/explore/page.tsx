"use client";
import { useEffect } from "react";
import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddBooks() {
  useEffect(() => {
    async function seedBooks() {
      const books = [
        {
          title: "The Alchemist",
          author: "Paulo Coelho",
          price: 500,
          description: "A journey of a shepherd boy seeking treasure.",
        },
        {
          title: "Sapiens",
          author: "Yuval Noah Harari",
          price: 850,
          description: "A brief history of humankind.",
        },
      ];

      for (const book of books) {
        await addDoc(collection(db, "books"), book);
      }

      alert("Books added!");
    }

    seedBooks();
  }, []);

  return <div className="text-white">Seeding books…</div>;
}
