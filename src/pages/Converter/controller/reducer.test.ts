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
    rates: {
      RUB: 80.28351,
      USD: 1,
      KZT: 450.187855,
      EUR: 0.923331,
    } as Rates,
    userRates: { RUB_USD: ['USD', 'RUB', 82] },
  };

  it('Process CHANGE_VALUE action', () => {
    const newState = reducer(initialState, {
      type: 'CHANGE_VALUE',
      payload: { index: 1, value: '1000,00' },
    });
    expect(newState.currencyIO[0].value).toBe('5607.48');
    expect(newState.currencyIO[1].value).toBe('1000.00');
    expect(newState.currencyIO[2].value).toBe('12.2');
  });

  it('Process CHANGE_CURRENCY action', () => {
    // Without user rate
    let newState = reducer(initialState, {
      type: 'CHANGE_CURRENCY',
      payload: {
        index: 0,
        currency: 'EUR',
      },
    });
    expect(newState.currencyIO[0].value).toBe('2.05');

    // With user rate
    newState = reducer(initialState, {
      type: 'CHANGE_CURRENCY',
      payload: {
        index: 1,
        currency: 'USD',
      },
    });
    expect(newState.currencyIO[1].value).toBe('12.18');
  });

  it('Process ADD_USER_RATE action', () => {
    // Add new user rate
    let newState = reducer(initialState, {
      type: 'ADD_USER_RATE',
      payload: {
        from: 'GBP',
        to: 'THB',
        rate: '34,568',
      },
    });
    expect(newState.userRates['GBP_THB'][2]).toBe(34.568);

    // Change exist user rate
    newState = reducer(initialState, {
      type: 'ADD_USER_RATE',
      payload: {
        from: 'RUB',
        to: 'USD',
        rate: '035,430',
      },
    });
    expect(newState.userRates['RUB_USD'][2]).toBe(35.43);
  });
});
