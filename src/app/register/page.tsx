"use client"; // Marks this component as a Client Component (required for hooks like useState)

import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook for programmatic navigation
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  // State for handling UI feedback (errors and loading status)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Initialize router to redirect user after successful registration
  const router = useRouter();

  // Dynamic input handler: updates specific field in formData based on input 'name'
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Async function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser reload
    setError("");       // Clear previous errors
    setLoading(true);   // Disable button and show loading state

    try {
      // Send POST request to our custom API route
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Success: Redirect user to the Login page
        router.push("/login");
      } else {
        // Error: Parse the error message from the backend
        const data = await res.json().catch(() => null);
        if (data && data.message) {
             setError(data.message); // Show specific backend error (e.g., "Email already exists")
        } else {
             setError("Unknown error occurred.");
        }
      }
    } catch (err) {
      // Network or unexpected errors
      console.error("ERROR:", err); 
      setError("Connection failed.");
    } finally {
      // Always reset loading state, regardless of success or failure
      setLoading(false);
    }
  };

  return (
    // Main Container: Full screen height, centered content, gray background
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">

      {/* --- BACKGROUND IMAGES (Responsive Strategy) --- */}
      
      {/* 1. Mobile Background: Visible only on small screens (md:hidden) */}
      <Image 
        src="/banner-mobile5.jpg" 
        alt="Background Mobile" 
        fill 
        className="object-cover z-0 md:hidden opacity-50" 
        style={{ objectPosition: 'bottom' }} 
      />
      
      {/* 2. Desktop Background: Visible only on medium+ screens (md:block) */}
      <Image 
        src="/banner.jpg" 
        alt="Background Desktop" 
        fill 
        className="object-cover z-0 hidden md:block opacity-50" 
        style={{ objectPosition: 'center' }} 
      />
      
      {/* Dark Overlay: Adds contrast for readability */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* --- REGISTRATION CARD --- */}
      <div className="relative z-10 w-full max-w-md px-4">
        
        {/* CARD CONTAINER:
            - min-h-[600px]: Fixed minimum height to maintain visual consistency with Login page
            - flex-col justify-center: Vertically aligns content within the fixed height
            - backdrop-blur-sm: Glassmorphism effect
        */}
        <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 border border-white/20 backdrop-blur-sm min-h-[600px] flex flex-col justify-center">
          
          {/* Header Section: Logo and Title */}
          <div className="flex flex-col items-center text-center">
             <Image src="/petlogo.png" alt="Logo" width={60} height={60} className="mb-2 drop-shadow-md" />
            <h1 className="text-3xl font-bold text-gray-900">Join Us!</h1>
            <p className="text-gray-600 mt-2">Create an account at Pamper's Pets House</p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm">
              <p className="font-bold">Atention</p>
              <p>{error}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 text-sm">Full Name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(241,194,117)] focus:border-transparent transition-all"
                placeholder="Your full name"
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 text-sm">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(241,194,117)] focus:border-transparent transition-all"
                placeholder="your@email.com"
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 text-sm">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(241,194,117)] focus:border-transparent transition-all"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: 'rgb(241, 194, 117)' }} // Custom brand orange
              className="w-full text-white font-bold py-3 rounded-lg hover:brightness-90 transition transform active:scale-95 shadow-md disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Footer Link to Login */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            Have an account already?{" "}
            <Link href="/login" className="font-bold hover:underline" style={{ color: 'rgb(133, 205, 208)' }}>
              Please Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}