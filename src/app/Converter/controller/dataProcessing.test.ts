import {
  ConverterState,
  ConverterStatus,
  Rates,
} from '../../../types';
import {
  getUserRateHash,
  recalculateCurrencies,
} from './dataProcessing';

describe('function getUserRateHash:', () => {
  it('Returns correct hash', () => {
    expect(getUserRateHash(['EUR', 'USD', 999])).toBe('EUR_USD');
    expect(getUserRateHash(['USD', 'EUR', 999])).toBe('EUR_USD');
    expect(getUserRateHash(['RUB', 'RSD', 999])).toBe('RSD_RUB');
  });
});

describe('function recalculateCurrencies:', () => {
  it('Correct recalculates CurrencyIO blocks by passed index', () => {
    const state: ConverterState = {
      status: ConverterStatus.UPDATING,
      updated: null,
      currencyIO: [
        { currency: 'RSD', value: '500' },
        { currency: 'EUR', value: '1' },
        { currency: 'USD', value: '345' },
      ],
      rates: { EUR: 0.9218, RSD: 107.8928, USD: 1 } as Rates,
      userRates: {},
      tip: null,
      settings: {
        tripleСonversion: true,
      },
    };
    // Recalculate value by index 1
    recalculateCurrencies(state, 1);
    expect(state.currencyIO[0].value).toBe('117.05');
    expect(state.currencyIO[1].value).toBe('1');
    expect(state.currencyIO[2].value).toBe('1.08');

    state.currencyIO[0].value = '999';
    state.currencyIO[1].value = '999';
    state.currencyIO[2].value = '1.5';

    // Recalculate value by index 2
    recalculateCurrencies(state, 2);
    expect(state.currencyIO[0].value).toBe('161.84');
    expect(state.currencyIO[1].value).toBe('1.38');
    expect(state.currencyIO[2].value).toBe('1.5');
  });

  it('Correct recalculates CurrencyIO blocks with user rate', () => {
    const state: ConverterState = {
      status: ConverterStatus.UPDATING,
      updated: null,
      currencyIO: [
        { currency: 'RSD', value: '999' },
        { currency: 'EUR', value: '1' },
        { currency: 'USD', value: '999' },
      ],
      rates: { EUR: 0.9218, RSD: 107.8928, USD: 1 } as Rates,
      userRates: { EUR_RSD: ['EUR', 'RSD', 117.5] },
      tip: null,
      settings: {
        tripleСonversion: true,
      },
    };
    recalculateCurrencies(state, 1);
    expect(state.currencyIO[0].value).toBe('117.5');
    expect(state.currencyIO[1].value).toBe('1');
    expect(state.currencyIO[2].value).toBe('1.08');
  });

  it('Correct recalculates CurrencyIO blocks with reverce user rate', () => {
    const state: ConverterState = {
      status: ConverterStatus.UPDATING,
      updated: null,
      currencyIO: [
        { currency: 'RSD', value: '235' },
        { currency: 'EUR', value: '999' },
        { currency: 'USD', value: '999' },
      ],
      rates: { EUR: 0.9218, RSD: 107.8928, USD: 1 } as Rates,
      userRates: { EUR_RSD: ['EUR', 'RSD', 117.5] },
      tip: null,
      settings: {
        tripleСonversion: true,
      },
    };
    recalculateCurrencies(state, 0);
    expect(state.currencyIO[0].value).toBe('235');
    expect(state.currencyIO[1].value).toBe('2');
    expect(state.currencyIO[2].value).toBe('2.18');
  });
});
