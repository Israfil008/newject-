"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <Link href="/" className="text-2xl font-bold text-blue-600">PustakLink</Link>
      <ul className="flex gap-6 font-medium text-gray-700">
        <li><Link href="/explore">Explore</Link></li>
        <li><Link href="/sell">Sell</Link></li>
        <li><Link href="/cart">Cart</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
}
