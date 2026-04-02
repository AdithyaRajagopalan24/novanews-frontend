import { ClerkProvider, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth(); /

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav className="p-4 flex justify-between border-b">
            <h1 className="text-xl font-bold">NovaNews</h1>

            {userId ? (
              <UserButton />
            ) : (
              <SignInButton />
            )}
          </nav>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}