import { currencyNames } from '../data/currencyNames';

export type Currency = keyof typeof currencyNames;
export type Updated = number;

export interface CurrencyIO {
  value: string;
  currency: Currency;
}

export type Rates = {
  [index in Currency]: number;
};

export interface InitialState {
  updated: Updated | null;
  base: Currency;
  currencyIO: CurrencyIO[];
  rates: Rates | null;
}
