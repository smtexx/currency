import { createStateCopy } from '../../../lib/helpers';
import {
  ConverterState,
  ConverterStatus,
  Rates,
  Updated,
} from '../../../types';
import { reducer } from './reducer';

describe('function reducer:', () => {
  const initialState: ConverterState = {
    updated: null,
    status: ConverterStatus.UPDATING,
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
    tip: null,
    settings: {
      tripleСonversion: true,
    },
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

    // Recalculates currency blocks if add user rate
    newState = reducer(initialState, {
      type: 'ADD_USER_RATE',
      payload: {
        from: 'USD',
        to: 'RUB',
        rate: '35',
      },
    });
    expect(newState.userRates['RUB_USD'][2]).toBe(35);
    expect(newState.currencyIO[0].value).toBe('449737.67');
    expect(newState.currencyIO[1].value).toBe('34965');
    expect(newState.currencyIO[2].value).toBe('999');
  });

  it('Process REMOVE_USER_RATE action', () => {
    // Racalculates currency blocks if user rate was active
    let newState = reducer(initialState, {
      type: 'REMOVE_USER_RATE',
      payload: {
        from: 'USD',
        to: 'RUB',
      },
    });
    expect(newState.currencyIO[0].value).toBe('449737.67');
    expect(newState.currencyIO[1].value).toBe('80203.23');
    expect(newState.currencyIO[2].value).toBe('999');
    expect('RUB_USD' in newState.userRates).toBe(false);

    let localState = createStateCopy(initialState);
    localState.userRates['EUR_KZT'] = ['EUR', 'KZT', 480];
    newState = reducer(localState, {
      type: 'REMOVE_USER_RATE',
      payload: {
        from: 'EUR',
        to: 'KZT',
      },
    });

    expect(newState.currencyIO[0].value).toBe('999');
    expect(newState.currencyIO[1].value).toBe('999');
    expect(newState.currencyIO[2].value).toBe('999');
    expect('EUR_KZT' in newState.userRates).toBe(false);
  });

  it('Process UPDATE_STATUS action', () => {
    const stateCopy = createStateCopy(initialState);
    stateCopy.rates = null;

    const rates = { EUR: 0.98, USD: 1.1 } as Rates;
    const updated = 194763578 as Updated;

    let newState = reducer(stateCopy, {
      type: 'UPDATE_STATUS',
      payload: {
        status: ConverterStatus.ERROR,
      },
    });
    expect(newState.status).toBe(ConverterStatus.ERROR);

    newState = reducer(stateCopy, {
      type: 'UPDATE_STATUS',
      payload: {
        status: ConverterStatus.UPDATING,
      },
    });
    expect(newState.status).toBe(ConverterStatus.UPDATING);

    newState = reducer(stateCopy, {
      type: 'UPDATE_STATUS',
      payload: {
        status: ConverterStatus.READY,
        rates,
        updated,
      },
    });
    expect(newState.status).toBe(ConverterStatus.READY);
    expect(newState.updated).toBe(updated);
    expect(newState.rates).toEqual(rates);
  });
});
