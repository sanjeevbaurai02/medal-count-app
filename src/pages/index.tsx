import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MedalTable from '../components/MedalTable';
import { CountryMedals, MedalType } from '../types/types';

export default function Home() {
  const [data, setData] = useState<CountryMedals[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const sort = (router.query.sort as MedalType) || 'gold';

  useEffect(() => {
    fetch('/data/medals.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load medals data.');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (data.length === 0) return <div>Loading...</div>;
  return <MedalTable data={data} initialSort={sort} />;
}
