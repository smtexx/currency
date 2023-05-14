import { InitialState } from '../../../types';

export const initialState: InitialState = {
  updated: null,
  base: 'EUR',
  currencyIO: [
    { currency: 'EUR', value: '1' },
    { currency: 'RSD', value: '0' },
  ],
  rates: null,
};
