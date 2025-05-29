import RecipeList from './recipes-list';
import Filters from '../../src/components/Filters';


interface SearchParams {
  q?: string;
  diet?: string;
  page?: string;
  minCalories?: string;
  maxCalories?: string;
  maxReadyTime?: string;
}


export default async function RecipesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = searchParams.q ?? '';
  const diet = searchParams.diet ?? '';
  const page = Number(searchParams.page ?? '1');   

  const list = await RecipeList({
    query,
    diet,
    page,
    minCalories: searchParams.minCalories,
    maxCalories: searchParams.maxCalories,
    maxReadyTime: searchParams.maxReadyTime,
  });
  

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">
        نتایج جستجو برای:{' '}
        <span className="text-gray-800">{query || '...'}</span>
      </h1>

      <Filters />


      {list}
    </section>
  );
}
