'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface FavoriteRecipe {
  id: number;
  title: string;
  image: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">دستورهای مورد علاقه شما ❤️</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">هنوز غذایی به علاقه‌مندی‌ها اضافه نکردید.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={200}
                className="rounded-md w-full h-48 object-cover"
              />
              <h2 className="mt-2 font-semibold text-lg text-center">{item.title}</h2>
              <button
                onClick={() => removeFavorite(item.id)}
                className="mt-3 bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700"
              >
                حذف از علاقه‌مندی‌ها
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
