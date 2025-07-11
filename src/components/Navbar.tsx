// src/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold text-lg">NewJect</div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/sell">Sell</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
