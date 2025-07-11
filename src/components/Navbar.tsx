"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link href="/" className="text-2xl font-bold text-blue-600">PustakLink</Link>
      <div className="flex gap-4">
        <Link href="/explore">Explore</Link>
        <Link href="/sell">Sell</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}
