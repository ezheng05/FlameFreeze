import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlameFreeze - Advanced Wildfire Suppression System",
  description: "An innovative solution for wildfire prevention and management in Los Angeles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
          <header className="bg-amber-700 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">FlameFreeze</Link>
              <nav>
                <ul className="flex space-x-6">
                  <li><Link href="/" className="hover:underline">Dashboard</Link></li>
                  <li><Link href="/system" className="hover:underline">System</Link></li>
                  <li><Link href="/simulation" className="hover:underline">Simulation</Link></li>
                  <li><Link href="/community" className="hover:underline">Community</Link></li>
                  <li><Link href="/about" className="hover:underline">About</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
              <p className="text-center">© 2025 FlameFreeze | EWB Design Corner 2025</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
