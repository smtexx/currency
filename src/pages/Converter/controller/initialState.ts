import { ConverterState } from '../../../types';

export const initialState: ConverterState = {
  updated: null,
  status: 'UPDATING',
  currencyIO: [
    { currency: 'EUR', value: '1' },
    { currency: 'RSD', value: '117.5' },
  ],
  rates: null,
  userRates: {},
};
