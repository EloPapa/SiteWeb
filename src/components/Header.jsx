"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[60px]">
        {/* Logo */}
        
        <Link href="/" className="text-xl font-bold dark:text-white">          
          MON PORTFOLIO
        </Link>

        {/* Bouton hamburger mobile */}
        <div className="md:hidden relative flex items-center">
          {/* Wrapper pour le décalage */}
          <div className="mr-[50px]">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 dark:text-white"
            >
              ☰
            </button>
          </div>

          {/* Menu mobile */}
          {open && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border rounded shadow-md flex flex-col space-y-2 p-2 z-50">
              <Link
                href="/"
                className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                Accueil
              </Link>
              <Link
                href="/projets"
                className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                Projets
              </Link>
              <Link
                href="/a-propos"
                className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}