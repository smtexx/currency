import { ConverterState, Rates } from '../../../types';
import { reducer } from './reducer';

describe('function reducer:', () => {
  const initialState: ConverterState = {
    updated: null,
    currencyIO: [
      { currency: 'KZT', value: '999' },
      { currency: 'RUB', value: '999' },
      { currency: 'USD', value: '999' },
    ],
    rates: { RUB: 80.28351, USD: 1, KZT: 450.187855 } as Rates,
    userRates: { RUB_USD: ['USD', 'RUB', 82] },
  };
  it('Process CHANGE_VALUE action', () => {
    const actionType = 'CHANGE_VALUE';
    const index = 1;
    const newState = reducer(initialState, {
      type: actionType,
      payload: { index, value: '1000,00' },
    });
    expect(newState.currencyIO[0].value).toBe('5607.48');
    expect(newState.currencyIO[1].value).toBe('1000.00');
    expect(newState.currencyIO[2].value).toBe('12.2');
  });
});
