export type MedalType = 'gold' | 'silver' | 'bronze' | 'total';

export interface CountryMedals {
  code: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export interface CountryData {
  index: number;
  code: string;
}