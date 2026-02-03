=> Pamper's Pets House - Authentication System <=
This project is a web application built with Next.js 15+ (App Router), featuring a robust authentication system, a responsive interface, and a connection to a PostgreSQL database.

The goal is to provide a secure platform where users can register, log in, and access personalized areas (such as a navigation bar displaying the user's name).


=> Technologies Used <=
The project was built using a modern web development stack:

Framework: Next.js 16 (React Server Components & App Router)

Language: TypeScript (Static typing)

Styling: Tailwind CSS (Utility-first CSS)

Database: PostgreSQL

ORM (Object-Relational Mapping): Prisma

Authentication: NextAuth.js v4

Encryption: Bcryptjs (for password hashing)

Icons/UI: Heroicons / Custom Design System (Glassmorphism)

=> Features <=
1. Complete Authentication (Credentials)
User Registration:

Validation of mandatory fields.

Check for duplicate emails in the database.

Password encryption before saving to the database.

Secure Login:

Credential validation (Email/Password).

Session persistence with JWT (JSON Web Token).

Logout:

Secure session termination.

2. Interface (UI/UX)
Responsive Design: Navbar and pages adaptable for Mobile and Desktop.

Glassmorphism: "Frosted glass" effect on Login/Register forms.

Visual Feedback:

Error messages (e.g., "Incorrect password").

Buttons with "loading" and "disabled" states.

Background images with opacity controlled via Tailwind.

Dynamic Navbar:

Displays "Login/Register" for visitors.

Displays "Hello, [Name]" and a "Logout" button for logged-in users.

📂 Project Structure
Below is an explanation of the most important files and folders configured:

Plaintext
├── prisma
│   └── schema.prisma        # Database table definitions (User)
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── [...nextauth]
│   │   │   │   │   └── route.ts    # NextAuth configuration (Login/Session)
│   │   │   │   └── register
│   │   │   │       └── route.ts    # Account creation API (Backend)
│   │   ├── login
│   │   │   └── page.tsx            # Login Screen (Frontend)
│   │   ├── register
│   │   │   └── page.tsx            # Registration Screen (Frontend)
│   │   ├── layout.tsx              # Global Layout (Wraps App with AuthProvider)
│   │   └── page.tsx                # Home Page
│   ├── components
│   │   ├── Navbar.tsx              # Responsive menu with session logic
│   │   ├── Footer.tsx              # Site footer
│   │   └── SessionProvider.tsx     # NextAuth Context (Client Component)
│   └── lib
│       └── prisma.ts               # Single Prisma Client instance (Singleton)
├── .env                            # Environment variables (Passwords and Keys)
└── README.md                       # Project documentation


=> How to Run Locally <=
Prerequisites
Node.js (version 18 or higher)

PostgreSQL database running locally (or via Docker)

Step 1: Clone and Install
Bash
# Clone the repository (if applicable)
git clone https://your-repo.com/pamper-pets.git

# Enter the folder
cd pamper-pets

# Install dependencies
npm install
Step 2: Configure Environment Variables
Create a .env file in the project root and configure the keys:

Snippet de código
# Connection to PostgreSQL (Local example)
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"

# Base Site URL (Mandatory for NextAuth)
NEXTAUTH_URL="http://localhost:3000"

# Secret key to encrypt tokens (Generate a random string)
NEXTAUTH_SECRET="your_super_secret_key_here"
Step 3: Configure the Database (Prisma)
Run the commands to create tables in your PostgreSQL database:

Bash
# Synchronizes schema.prisma with the database
npx prisma db push

# Generates the Prisma Client (required whenever the schema changes)
npx prisma generate
Step 4: Run the Application
Bash
npm run dev
Open http://localhost:3000 in your browser.

=> Useful Prisma Commands
View data visually: Open a graphical interface to view, edit, and delete database users.

Bash
npx prisma studio
Tip: If you encounter permission errors on Windows, use npx.cmd prisma studio.

Update the database: If you modify the schema.prisma file (e.g., adding a phone field), run:

Bash
npx prisma db push

How to Check and Test Data (Prisma Studio)
To verify if users are being registered correctly, use Prisma Studio. This is a graphical interface for your database.

Keep your server running (npm run dev) in one terminal.

Open a new terminal and run:

Bash
npx prisma studio
(If you are on Windows and get a permission error, try: npx.cmd prisma studio).

Access http://localhost:5555 in your browser.
s
Click on the User model to see the registered accounts.

You can verify the email.

You can see the password (it will be encrypted/hashed, not plain text).

You can manually delete users to re-test the registration flow.

Useful Commands
Update the database: If you modify the schema.prisma file (e.g., adding a phone field), run:

Bash
npx prisma db push


=> Troubleshooting <=
During development, the following scenarios were addressed:

Error: PrismaClient is not a constructor or Module not found

Cause: Incorrect import or failure to generate the client.

Solution: We used a Singleton file in src/lib/prisma.ts and imported it using a relative path (e.g., ../../lib/prisma).

Error: NO_SECRET in terminal

Cause: Missing NEXTAUTH_SECRET variable in .env.

Solution: Added the key to the environment file.

User name not appearing in Navbar ("Hello, User!")

Cause: NextAuth does not return name by default in the JWT strategy.

Solution: Added jwt and session callbacks in the [...nextauth]/route.ts file to pass this data through.

Error: useSession must be wrapped in <SessionProvider>

Cause: Attempting to use the session directly in layout.tsx.

Solution: Moved logic to Navbar.tsx and wrapped the application with a separate AuthProvider component.

=> Sugestions for Next Implementations:<=

[ ] Create User Profile page.

[ ] Add password recovery.

[ ] Create artwork upload system for T-shirts (PNG).

[ ] Implement shopping cart.