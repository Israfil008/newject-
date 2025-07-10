'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Unknown error during logout.');
      }
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">PustakLink</Link>
      <div className="flex gap-4 items-center">
        <Link href="/explore" className="hover:underline">Explore</Link>
        {currentUser ? (
          <>
            <Link href="/sell" className="hover:underline">Sell</Link>
            <span className="text-sm text-gray-600 hidden sm:inline">{currentUser.email}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-green-500 text-white px-3 py-1 rounded">
              Login
            </Link>
            <Link href="/signup" className="bg-blue-500 text-white px-3 py-1 rounded">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
