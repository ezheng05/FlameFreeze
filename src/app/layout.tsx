import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">FlameFreeze</Link>
                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                  <ul className="flex space-x-6">
                    <li><Link href="/" className="hover:underline">Dashboard</Link></li>
                    <li><Link href="/system" className="hover:underline">System</Link></li>
                    <li><Link href="/simulation" className="hover:underline">Simulation</Link></li>
                    <li><Link href="/community" className="hover:underline">Community</Link></li>
                    <li><Link href="/about" className="hover:underline">About</Link></li>
                  </ul>
                </nav>
                {/* Mobile Menu Button */}
                <button className="md:hidden" id="mobile-menu-button">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              {/* Mobile Navigation */}
              <div className="hidden md:hidden" id="mobile-menu">
                <nav className="py-4">
                  <ul className="flex flex-col space-y-4">
                    <li><Link href="/" className="block hover:underline">Dashboard</Link></li>
                    <li><Link href="/system" className="block hover:underline">System</Link></li>
                    <li><Link href="/simulation" className="block hover:underline">Simulation</Link></li>
                    <li><Link href="/community" className="block hover:underline">Community</Link></li>
                    <li><Link href="/about" className="block hover:underline">About</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm md:text-base">© 2025 FlameFreeze | EWB Design Corner 2025</p>
            </div>
          </footer>
        </div>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.getElementById('mobile-menu-button').addEventListener('click', function() {
              const mobileMenu = document.getElementById('mobile-menu');
              const menuButton = this;
              if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                menuButton.innerHTML = '<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
              } else {
                mobileMenu.classList.add('hidden');
                menuButton.innerHTML = '<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>';
              }
            });
          `
        }} />
      </body>
    </html>
  );
}
