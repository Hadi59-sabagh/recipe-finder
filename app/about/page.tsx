export default function AboutPage() {
    return (
      <section className="max-w-2xl mx-auto space-y-6 text-gray-800 leading-relaxed">
        <h1 className="text-3xl font-bold text-orange-600 text-center">درباره Recipe Finder</h1>
  
        <p>
          Recipe Finder یک اپلیکیشن تحت وب است که به شما کمک می‌کند با وارد کردن مواد اولیه یا نام غذا، دستورهای متنوع و کاربردی برای آشپزی پیدا کنید. این ابزار مناسب افرادی‌ست که با مواد محدود یا زمان کم، به دنبال ایده‌ای برای پخت غذا هستند.
        </p>
  
        <p>
          اطلاعات این دستورها از طریق API سایت <a href="https://spoonacular.com/" className="text-blue-600 underline" target="_blank">Spoonacular</a> دریافت می‌شود و در قالبی ساده، جذاب و واکنش‌گرا نمایش داده می‌شود.
        </p>
  
        <p>
          هدف ما ارائه‌ی تجربه‌ای سریع، آسان و دلنشین برای عاشقان آشپزی است. امیدواریم با استفاده از این سایت، آشپزی برای شما لذت‌بخش‌تر شود!
        </p>
  
        <p className="text-sm text-gray-500 text-center mt-10">
          ساخته شده با ❤️ توسط تیم توسعه‌دهنده Recipe Finder
        </p>
      </section>
    )
  }
  