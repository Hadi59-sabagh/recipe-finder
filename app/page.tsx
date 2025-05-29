import SearchBar from '../src/components/SearchBar';


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 mt-20 text-center">
      <h1 className="text-4xl font-bold text-orange-600">Recipe Finder</h1>
      <p className="text-lg text-gray-700">
        با وارد کردن مواد اولیه یا نام غذا، دستور مورد نظر خود را پیدا کنید
      </p>
      <SearchBar />
    </section>
  );
}
