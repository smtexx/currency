import { currencyNames } from '../data/currencyNames';

export type Updated = number;

export enum ConverterStatus {
  UPDATING = 'UPDATING',
  READY = 'READY',
  ERROR = 'ERROR',
}

export type Currency = keyof typeof currencyNames;

export interface CurrencyIO {
  value: string;
  currency: Currency;
}

export type UserRate = [Currency, Currency, number];

export type Rates = {
  [index in Currency]?: number;
};

export interface ConverterState {
  updated: Updated | null;
  status: ConverterStatus;
  currencyIO: CurrencyIO[];
  rates: Rates | null;
  userRates: {
    [key: string]: UserRate;
  };
  tip: string[] | null;
  settings: {
    tripleСonversion: boolean;
  };
  installprompt: Event | null;
}
