import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeProvider from '../src/context/ThemeContext';
import ThemeToggle from '../src/components/ThemeToggle';
import CurrentYear from '../src/components/CurrentYear';

export const metadata: Metadata = {
  title: 'Recipe Finder',
  description: 'Find recipes by ingredients or keywords.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-orange-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 ease-in-out font-sans">

        <ThemeProvider>
        <header className="bg-orange-500 dark:bg-orange-600 text-white shadow-md">
  <nav className="container mx-auto flex items-center justify-between p-4" dir="rtl">
    {/* منو سمت راست */}
    <div className="flex gap-12 font-semibold text-lg">
      <Link href="/" className="text-white no-underline hover:text-orange-300 transition-colors duration-200">
        خانه
      </Link>
      <Link href="/favorites" className="text-white no-underline hover:text-orange-300 transition-colors duration-200">
        علاقه‌مندی‌ها
      </Link>
      <Link href="/about" className="text-white no-underline hover:text-orange-300 transition-colors duration-200">
        درباره ما
      </Link>
    </div>

    {/* دکمه تاریک روشن سمت چپ */}
    <div>
      <ThemeToggle />
    </div>
  </nav>
</header>



          <main className="flex-1 container mx-auto p-4 bg-orange-50 dark:bg-gray-900 transition-colors">
            {children}
          </main>

          <footer className="bg-orange-100 dark:bg-orange-950 text-center text-sm text-gray-600 dark:text-gray-300 py-4">
            © <CurrentYear /> Recipe Finder
          </footer>
        </ThemeProvider>

      </body>
    </html>
  );
}
