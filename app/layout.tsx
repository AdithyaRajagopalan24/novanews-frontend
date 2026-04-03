import { ClerkProvider, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <nav className="p-4 flex justify-between items-center border-b bg-white">
            <h1 className="text-xl font-bold">NovaNews</h1>

            <div className="flex items-center gap-4">
              {userId ? (
                
                <UserButton />
              ) : (
                // User is logged out
                <SignInButton mode="modal">
                  <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </nav>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

export const dynamic = "force-dynamic";