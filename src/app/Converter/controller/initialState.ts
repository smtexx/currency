import { ConverterState, ConverterStatus } from '../../../types';

export const initialState: ConverterState = {
  updated: null,
  status: ConverterStatus.UPDATING,
  currencyIO: [
    { currency: 'EUR', value: '1' },
    { currency: 'RSD', value: '117.5' },
    { currency: 'RUB', value: '88.4' },
  ],
  rates: null,
  userRates: {},
  tip: null,
  settings: {
    exchangeBlocks: 2,
  },
};
