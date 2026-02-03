"use client"; // Marks this as a Client Component (required for hooks like useSession and useState)

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// 1. Import NextAuth hooks for session management
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  // State to manage the visibility of the mobile menu (hamburger)
  const [isOpen, setIsOpen] = useState(false);
  
  // 2. Retrieve session data (checks if user is logged in)
  // 'session' will be null if unauthenticated, or contain user data if logged in
  const { data: session } = useSession();

  // Handler to toggle mobile menu open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Main Nav Container: High z-index ensures it stays on top of other content
    <nav className="bg-[#333] text-white p-4 relative z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* --- BRANDING / LOGO --- */}
        <div className="flex items-center gap-3">
          <Image 
            src="/petlogo.png" 
            alt="Pet Logo"
            width={100} 
            height={100}
            className="object-contain"
          />
          <div className="font-bold text-lg md:text-xl">
            Pamper´s Pets House
          </div>
        </div>

        {/* --- DESKTOP MENU --- */}
        {/* Hidden on mobile, Flexbox on medium screens and up */}
        <div className="hidden md:flex gap-8 text-xl font-medium items-center">
          <Link href="/" className="hover:text-[rgb(240,181,209)] transition-colors">
            Home
          </Link>

          {/* CONDITIONAL RENDERING: Check if a user is authenticated */}
          {session ? (
            // STATE A: User IS logged in
            <>
              <span className="text-[rgb(133,205,208)] font-bold">
                Hello, {session.user?.name || "Client"}!
              </span>
              <button 
                onClick={() => signOut()} // Triggers NextAuth logout function
                className="hover:text-red-400 transition-colors border border-white/20 px-4 py-1 rounded-full text-base"
              >
                Logout
              </button>
            </>
          ) : (
            // STATE B: User is NOT logged in (Guest)
            <>
              <Link href="/login" className="hover:text-[rgb(133,205,208)] transition-colors">
                Login
              </Link>
              <Link href="/register" className="hover:text-[rgb(241,194,117)] transition-colors">
                Register
              </Link>
            </>
          )}
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        {/* Visible only on mobile (md:hidden) */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 text-white focus:outline-none"
        >
          {/* Icons switch based on 'isOpen' state (X for open, Bars for closed) */}
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {/* Conditionally rendered based on 'isOpen' state */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#333] shadow-lg md:hidden flex flex-col items-center py-6 gap-6 border-t border-gray-700">
          
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)} // Close menu on click
            className="text-lg hover:text-[rgb(240,181,209)] transition-colors"
          >
            Home
          </Link>
          
          {/* MOBILE CONDITIONAL LOGIC (Same as Desktop) */}
          {session ? (
            <>
              <span className="text-[rgb(133,205,208)] font-bold text-lg">
                Hello, {session.user?.name}
              </span>
              <button 
                onClick={() => {
                    signOut();
                    setIsOpen(false); // Close menu after logging out
                }}
                className="text-lg text-red-400 hover:text-red-300 transition-colors font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="text-lg hover:text-[rgb(133,205,208)] transition-colors"
              >
                Login
              </Link>
              
              <Link 
                href="/register" 
                onClick={() => setIsOpen(false)}
                className="text-lg hover:text-[rgb(241,194,117)] transition-colors"
              >
                Register
              </Link>
            </>
          )}
          
        </div>
      )}
    </nav>
  );
}