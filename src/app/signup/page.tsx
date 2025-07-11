"use client";
import { useState } from "react";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault(); setMsg(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMsg("Signup successful!");
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <main className="p-8 flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handle} className="bg-white p-6 rounded shadow space-y-4">
        <h1 className="text-xl font-bold">Sign Up</h1>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Sign Up</button>
        {msg && <p className="mt-2 text-center">{msg}</p>}
      </form>
    </main>
  );
}
