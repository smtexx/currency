import { ConverterState } from '../../../types';

export const initialState: ConverterState = {
  updated: null,
  currencyIO: [
    { currency: 'EUR', value: '1' },
    { currency: 'RSD', value: '117.5' },
  ],
  rates: null,
  userRates: {},
};
