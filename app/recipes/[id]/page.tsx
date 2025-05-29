'use client';

import React, { useEffect, useState, useRef, use } from 'react';
import Image from 'next/image';
import html2pdf from 'html2pdf.js';
import FavoriteButton from '../../../src/components/FavoriteButton';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: { id: number; original: string }[];
  analyzedInstructions: { steps: { number: number; step: string }[] }[];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default function RecipeDetailPage({ params }: Props) {
  const resolvedParams = use(params); // unwrap کردن Promise params
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${resolvedParams.id}/information?apiKey=${apiKey}`
        );
        if (!res.ok) throw new Error('خطا در دریافت داده از API');
        const data = await res.json();
        setRecipe(data);
      } catch (error: any) {
        console.error('خطا در دریافت اطلاعات غذا:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  const handleDownloadPDF = () => {
    if (!ref.current || !recipe) return;

    // برای رفع ارور رنگ oklch، بهتره در زمان pdf گرفتن یک کلاس ساده به ریشه اضافه کنیم
    // یا اینکه استایل‌ها رو با css پاک کنیم، اینجا ساده‌ترین حالت رو در نظر می‌گیریم.

    // می‌تونیم قبل از فراخوانی pdf کلاس simple-pdf رو اضافه کنیم و بعد حذف کنیم:
    const element = ref.current;
    element.classList.add('simple-pdf');

    html2pdf()
      .set({
        margin: 0.5,
        filename: `${recipe.title || 'recipe'}.pdf`,
        html2canvas: { scale: 2, logging: true, useCORS: true },
        jsPDF: { format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save()
      .finally(() => {
        element.classList.remove('simple-pdf');
      })
      .catch((error: any) => {
        console.error('خطا در ساخت PDF:', error);
      });
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!recipe) return <p className="text-red-600">اطلاعات غذا پیدا نشد.</p>;

  return (
    <>
      <style>{`
        /* این کلاس برای ساخت pdf استایل‌ها را ساده می‌کند و رنگ‌های ناسازگار را حذف می‌کند */
        .simple-pdf {
          color: black !important;
          background: white !important;
        }
        .simple-pdf * {
          color: black !important;
          background: white !important;
          box-shadow: none !important;
          text-shadow: none !important;
          filter: none !important;
        }
        /* جایگزین رنگ‌های oklch در این کلاس */
        .text-orange-600 {
          color: #ea580c !important;
        }
        /* برای رفع مشکل hover روی دکمه داخل PDF */
        .simple-pdf button {
          pointer-events: none !important;
        }
      `}</style>

      <div className="space-y-6" ref={ref}>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={800}
          height={400}
          className="rounded-xl w-full object-cover"
        />
        <h1 className="text-3xl font-bold text-orange-600">{recipe.title}</h1>

        <section>
          <h2 className="text-xl font-semibold">🧂 مواد لازم:</h2>
          <ul className="list-disc ps-6">
            {recipe.extendedIngredients?.map((item) => (
              <li key={item.id}>{item.original}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">👨‍🍳 دستور پخت:</h2>
          {recipe.analyzedInstructions?.[0]?.steps?.length ? (
            <ol className="list-decimal ps-6 space-y-2">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <p>مراحلی برای این غذا ثبت نشده است.</p>
          )}
        </section>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          🕒 زمان پخت: {recipe.readyInMinutes} دقیقه | 👥 برای {recipe.servings} نفر
        </div>

        <div className="flex gap-4 flex-wrap mt-6">
          <FavoriteButton recipe={recipe} />
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold"
            type="button"
          >
            دانلود PDF 📄
          </button>
        </div>
      </div>
    </>
  );
}
