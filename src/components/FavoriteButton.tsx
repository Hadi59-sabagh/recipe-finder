'use client';

import { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface Props {
  recipe: Recipe;
}

export default function FavoriteButton({ recipe }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        const favorites: Recipe[] = JSON.parse(stored);
        setIsFavorite(favorites.some((item) => item.id === recipe.id));
      }
    } catch {
      setIsFavorite(false);
    }
  }, [recipe.id]);

  const toggleFavorite = () => {
    try {
      const stored = localStorage.getItem('favorites');
      let favorites: Recipe[] = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        favorites = favorites.filter((item) => item.id !== recipe.id);
      } else {
        favorites.push(recipe);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('خطا در مدیریت علاقه‌مندی‌ها:', error);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`mt-4 px-5 py-2 rounded-xl font-semibold text-white transition ${
        isFavorite ? 'bg-red-600' : 'bg-green-600'
      }`}
    >
      {isFavorite ? 'حذف از علاقه‌مندی ❤️' : 'ذخیره در علاقه‌مندی ❤️'}
    </button>
  );
}
