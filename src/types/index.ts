import { currencyNames } from '../data/currencyNames';

export type Currency = keyof typeof currencyNames;
export type Updated = number;

export interface CurrencyIO {
  value: string;
  currency: Currency;
}

export type UserRate = [Currency, Currency, number];

export type Rates = {
  [index in Currency]: number;
};

export interface ConverterState {
  updated: Updated | null;
  currencyIO: CurrencyIO[];
  rates: Rates | null;
  userRates: {
    [key: string]: UserRate;
  };
}
