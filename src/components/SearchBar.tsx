'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/recipes?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto flex flex-col sm:flex-row shadow-md rounded-xl overflow-hidden"
    >
      <input
        type="text"
        placeholder="...مواد اولیه یا نام غذا را جستجو کنید"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-3 outline-none text-right"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 sm:py-0"
      >
        جستجو
      </button>
    </form>
  );
}
