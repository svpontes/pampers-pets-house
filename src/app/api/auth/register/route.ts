import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // Adjusted path to standard convention
import bcrypt from "bcryptjs";

/**
 * API Route: POST /api/auth/register
 * Function to handle new user registration.
 */
export async function POST(request: Request) {
  try {
    // 1. Parse the JSON body from the incoming request
    const body = await request.json();
    
    // --- DEBUG LOGS (Visible in server terminal) ---
    console.log("--- REGISTRATION DEBUG ---");
    console.log("Payload received:", body);

    const { name, email, password } = body;

    // 2. Validation: Ensure all fields are present
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required data" }, { status: 400 });
    }

    // 3. Database Check: Verify if the email is already registered
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // 4. Security: Encrypt the password using bcrypt
    // Salt rounds: 10 (Standard security level)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Database Action: Create the new user record
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    console.log("User created successfully with ID:", user.id);
    
    // 6. Response: Return success status (201 Created)
    return NextResponse.json({ message: "Success" }, { status: 201 });

  } catch (error: any) {
    // Error Handling: Catch potential server or database errors
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ message: "Internal Server Error", details: error.message }, { status: 500 });
  }
}