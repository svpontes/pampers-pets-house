import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // Ensure this path matches your project structure
import bcrypt from "bcryptjs";

/**
 * API Route: POST /api/auth/register
 * Description: Handles user registration, validates input, hashes password, and saves to DB.
 */
export async function POST(request: Request) {
  try {
    // 1. Parse the incoming JSON request body
    const body = await request.json();
    
    // --- DEBUG LOGGING ---
    console.log("--- REGISTRATION STARTED ---");
    console.log("Payload received:", body);
    // ---------------------

    const { name, email, password } = body;

    // 2. Validation: Check if all required fields are present
    if (!name) {
      console.log("ERROR: Missing 'name' field.");
      return NextResponse.json({ message: "Name is required." }, { status: 400 });
    }
    if (!email) {
      console.log("ERROR: Missing 'email' field.");
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }
    if (!password) {
      console.log("ERROR: Missing 'password' field.");
      return NextResponse.json({ message: "Password is required." }, { status: 400 });
    }

    // 3. Database Check: Ensure the email is unique
    console.log("Checking for existing user...");
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      console.log("ERROR: Duplicate email found.");
      return NextResponse.json({ message: "This email is already registered." }, { status: 400 });
    }

    // 4. Security: Hash the password using bcrypt
    // We use 10 salt rounds (standard for security/performance balance)
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Database Action: Create the new user
    console.log("Saving user to database...");
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("SUCCESS: User created with ID:", user.id);
    console.log("--- REGISTRATION ENDED ---");

    // 6. Response: Return user data (excluding the password)
    // We destructure 'password' out to ensure it's never sent back to the client
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error: any) {
    // Error Handling: Catch server or Prisma errors
    console.error("!!! CRITICAL SERVER ERROR !!!");
    console.error(error);
    
    return NextResponse.json({ 
      message: "Internal Server Error. Check server logs.",
      details: error.message 
    }, { status: 500 });
  }
}