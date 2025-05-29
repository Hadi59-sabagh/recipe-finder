'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [diet, setDiet] = useState(searchParams.get('diet') ?? '');
  const [minCalories, setMinCalories] = useState(searchParams.get('minCalories') ?? '');
  const [maxCalories, setMaxCalories] = useState(searchParams.get('maxCalories') ?? '');
  const [maxReadyTime, setMaxReadyTime] = useState(searchParams.get('maxReadyTime') ?? '');
  const query = searchParams.get('q') ?? '';

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (diet) params.set('diet', diet);
    if (minCalories) params.set('minCalories', minCalories);
    if (maxCalories) params.set('maxCalories', maxCalories);
    if (maxReadyTime) params.set('maxReadyTime', maxReadyTime);
    router.push(`/recipes?${params.toString()}`);
  }, [diet, minCalories, maxCalories, maxReadyTime]);

  return (
    <div className="space-y-4 my-6">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
        <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          رژیم:
          <select value={diet} onChange={(e) => setDiet(e.target.value)} className="p-2 border rounded">
            <option value="">همه</option>
            <option value="vegetarian">گیاه‌خواری</option>
            <option value="vegan">وگان</option>
            <option value="gluten free">بدون گلوتن</option>
          </select>
        </label>

        <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          کالری:
          <input
            type="number"
            placeholder="حداقل"
            value={minCalories}
            onChange={(e) => setMinCalories(e.target.value)}
            className="w-24 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="حداکثر"
            value={maxCalories}
            onChange={(e) => setMaxCalories(e.target.value)}
            className="w-24 p-2 border rounded"
          />
        </label>

        <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          زمان پخت (دقیقه):
          <input
            type="number"
            value={maxReadyTime}
            onChange={(e) => setMaxReadyTime(e.target.value)}
            className="w-24 p-2 border rounded"
          />
        </label>
      </div>
    </div>
  );
}
