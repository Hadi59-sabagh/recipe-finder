import Image from 'next/image';
import Link from 'next/link';

interface Props {
  query: string;
  diet?: string;
  page: number;
  minCalories?: string;
  maxCalories?: string;
  maxReadyTime?: string;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default async function RecipeList({
  query,
  diet,
  page,
  minCalories,
  maxCalories,
  maxReadyTime,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY!;
  const pageSize = 12;
  const offset = (page - 1) * pageSize;

  const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
  url.searchParams.set('query', query);
  url.searchParams.set('number', pageSize.toString());
  url.searchParams.set('offset', offset.toString());
  url.searchParams.set('apiKey', apiKey);

  if (diet) url.searchParams.set('diet', diet);
  if (minCalories) url.searchParams.set('minCalories', minCalories);
  if (maxCalories) url.searchParams.set('maxCalories', maxCalories);
  if (maxReadyTime) url.searchParams.set('maxReadyTime', maxReadyTime);
  if (minCalories || maxCalories) url.searchParams.set('addRecipeNutrition', 'true');

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  const data = await res.json();

  if (!data?.results?.length) {
    return <p className="text-red-600">هیچ نتیجه‌ای یافت نشد.</p>;
  }

  const cards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.results.map((recipe: Recipe) => (
        <Link
          key={recipe.id}
          href={`/recipes/${recipe.id}`}
          className="block bg-white dark:bg-gray-800 rounded-xl shadow p-3 hover:shadow-lg transition"
        >
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={300}
            height={200}
            className="rounded-lg w-full h-48 object-cover"
          />
          <h2 className="mt-2 font-semibold text-lg text-center text-gray-900 dark:text-white">
            {recipe.title}
          </h2>
        </Link>
      ))}
    </div>
  );

  const totalResults = data.totalResults as number;
  const totalPages = Math.ceil(totalResults / pageSize);

  const searchParams = new URLSearchParams({ q: query });
  if (diet) searchParams.set('diet', diet);
  if (minCalories) searchParams.set('minCalories', minCalories);
  if (maxCalories) searchParams.set('maxCalories', maxCalories);
  if (maxReadyTime) searchParams.set('maxReadyTime', maxReadyTime);

  const controls = (
    <div className="flex justify-center items-center gap-4 mt-8">
      {page > 1 && (
        <Link
          href={`/recipes?${(() => {
            const s = new URLSearchParams(searchParams);
            s.set('page', (page - 1).toString());
            return s.toString();
          })()}`}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          قبلی
        </Link>
      )}

      <span className="font-semibold">
        صفحه {page} از {totalPages}
      </span>

      {page < totalPages && (
        <Link
          href={`/recipes?${(() => {
            const s = new URLSearchParams(searchParams);
            s.set('page', (page + 1).toString());
            return s.toString();
          })()}`}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          بعدی
        </Link>
      )}
    </div>
  );

  return (
    <>
      {cards}
      {controls}
    </>
  );
}
