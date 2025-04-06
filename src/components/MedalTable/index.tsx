import { useState, useMemo } from 'react';
import { CountryData, CountryMedals, MedalType } from '../../types/types';
import styles from './MedalTable.module.css';
import MedalCard from '../MedalCard';

type Props = {
  data: CountryMedals[];
  initialSort: MedalType;
};



const MedalTable = ({ data, initialSort }: Props) => {
  const [sortBy, setSortBy] = useState<MedalType>(initialSort);
   const [sortByCode, setSortByCode] = useState<CountryData[]>([]);
  const sortedData = useMemo(() => {
    const sorted = [...data];
    const alphabeticalIndexMap = [...data]
    .sort((a, b) => a.code.localeCompare(b.code))
    .reduce<Record<string, number>>((acc, item, index) => {
      acc[item.code] = index;
      return acc;
    }, {});
    sorted.sort((a, b) => {
      const primary = b[sortBy] - a[sortBy];
      if (primary !== 0) return primary;

      // Tiebreaker rules
      if (sortBy === 'total') return b.gold - a.gold;
      if (sortBy === 'gold') return b.silver - a.silver;
      return b.gold - a.gold;
    });
    // return sorted.slice(0, 10);
    return sorted.slice(0, 10).map((item, index) => ({
      ...item,
      index: alphabeticalIndexMap[item.code], // 1-based index
    }));
  }, [data, sortBy]);

  const headers: MedalType[] = ['gold', 'silver', 'bronze', 'total'];
  return (
    <div className="custom-padding">
      <table className={styles.medalTable}>
        <thead>
          <tr className={styles.row}>
            <th></th>
            <th></th>
            {headers.map(header => (
              <th key={header} className={sortBy === header ? styles.sortBy: styles.default} onClick={() => setSortBy(header)}>
                {header !== "total" ?
                  (<MedalCard medalType={header} />) :
                  header.toUpperCase()
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((country, index) => (
            <tr key={index} className={styles.row}>
              <td>{index + 1}</td>
              <td  className={styles.countryCell}>
                <div id = {`flag-${country.code}`}
                  style={{
                    backgroundImage: 'url(/assets/flags.png)',
                    backgroundRepeat: 'no-repeat',
                    width: 37,
                    height: 17,
                    backgroundPosition: `0 -${country.index * 17}px`,
                  }}/>
                 <span>{country.code}</span>
              </td>
              <td>{country.gold}</td>
              <td>{country.silver}</td>
              <td>{country.bronze}</td>
              <td className={styles.total}><b>{country.gold + country.silver + country.bronze}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedalTable;
