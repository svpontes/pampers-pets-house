"use client"; // Indicates this component runs on the client-side

import { useState } from "react";
import { signIn } from "next-auth/react"; // NextAuth hook for authentication
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  // State management for form inputs, error messages, and loading status
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Navigation hook

  // Handler to update form state dynamically on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler to submit the login form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default page reload
    setError("");
    setLoading(true);

    // Attempt to sign in using NextAuth 'credentials' provider
    const result = await signIn("credentials", {
      redirect: false, // We handle redirection manually to show errors if needed
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    // Check if login failed (result contains error) or succeeded
    if (result?.error) {
      setError("Email ou senha inválidos."); // Display error message
    } else {
      router.push("/"); // Redirect to home page on success
      router.refresh(); // Refresh route to update session state in UI
    }
  };

  return (
    // Main Container: Gray background ensures good contrast when images have opacity
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">

      {/* --- 1. MOBILE BACKGROUND (With Opacity) --- */}
      {/* Visible only on small screens (md:hidden). Opacity set to 50% for softer look */}
      <Image
        src="/banner-mobile5.jpg"
        alt="Background Mobile"
        fill
        className="object-cover z-0 md:hidden opacity-50"
        style={{ objectPosition: 'bottom' }}
      />

      {/* --- 2. DESKTOP BACKGROUND (With Opacity) --- */}
      {/* Visible only on medium+ screens (md:block). Opacity set to 50% */}
      <Image
        src="/banner.jpg"
        alt="Background Desktop"
        fill
        className="object-cover z-0 hidden md:block opacity-50"
        style={{ objectPosition: 'center' }}
      />

      {/* --- DARK OVERLAY --- */}
      {/* Adds a slight dark tint (30%) to ensure text contrast against the background */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* --- LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-md px-4">
        
        {/* CARD CONTAINER:
            - min-h-[600px]: Fixed height to match Register page (prevents layout jump)
            - flex-col justify-center: Vertically centers content within the fixed height
            - backdrop-blur-sm: Adds a glassmorphism effect
        */}
        <div className="bg-white backdrop-blur-sm p-8 rounded-xl shadow-2xl space-y-6 border border-white/20 min-h-[600px] flex flex-col justify-center">
          
          <div className="flex flex-col items-center">
            <Image src="/petlogo.png" alt="Logo" width={70} height={70} className="mb-4 drop-shadow-md" />
            <h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
            <p className="text-gray-600 mt-2">Access your account Pamper's Pets House</p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm">
              <p className="font-bold">Erro</p>
              <p>{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1 text-sm">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(133,205,208)] focus:border-transparent transition-all"
                placeholder="your@email.com"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1 text-sm">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(133,205,208)] focus:border-transparent transition-all"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: 'rgb(133, 205, 208)' }}
              className="w-full text-white font-bold py-3 rounded-lg hover:brightness-90 transition transform active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Link to Registration Page */}
          <p className="text-center text-gray-600 mt-4 text-sm">
           Don't have an account yet?{" "}
            <Link href="/register" className="font-bold hover:underline" style={{ color: 'rgb(241, 194, 117)' }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}