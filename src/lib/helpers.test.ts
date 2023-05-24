import {
  cashData,
  clearNumericInput,
  createStateCopy,
  setClass,
  toFixedString,
} from './helpers';

describe('function setClass:', () => {
  it('Returns right class name', () => {
    const one = 'classOne';
    const two = 'classTwo';
    const three = 'classThree';
    expect(setClass([[one]])).toBe(one);
    expect(setClass([[one, true]])).toBe(one);
    expect(setClass([[one, false]])).toBe('');
    expect(setClass([[one], [two]])).toBe(`${one} ${two}`);
    expect(setClass([[one], [two, true]])).toBe(`${one} ${two}`);
    expect(setClass([[one], [two, false]])).toBe(one);
    expect(setClass([[one], [two, three, true]])).toBe(
      `${one} ${two}`
    );
    expect(setClass([[one], [two, three, false]])).toBe(
      `${one} ${three}`
    );
  });

  it('Throws error if class name is undefined', () => {
    expect(() => setClass([[undefined]])).toThrow();
  });
});

describe('function createStateCopy:', () => {
  it('Returns correct copy of state', () => {
    const state = {
      argOne: 5,
      argTwo: 'str',
      argThree: [1, 4, 6],
    };
    expect(createStateCopy(state)).toEqual(state);
    expect(createStateCopy(state) === state).toBe(false);
  });
});

describe('function clearNumericInput:', () => {
  it('Returns correct string', () => {
    expect(clearNumericInput('45fgjj678')).toBe('45678');
    expect(clearNumericInput('fgjj678')).toBe('678');
    expect(clearNumericInput('45fgjj')).toBe('45');
    expect(clearNumericInput('456,56d')).toBe('456.56');
    expect(clearNumericInput('00456,56')).toBe('456.56');
    expect(clearNumericInput('00.456,56')).toBe('0.45656');
    expect(clearNumericInput('0.0.4,56,5.6')).toBe('0.045656');
    expect(clearNumericInput('rgea-=')).toBe('0');
    expect(clearNumericInput('.')).toBe('0.');
    expect(clearNumericInput('')).toBe('0');
    expect(clearNumericInput('jgfg.klh8ghj')).toBe('0.8');
    expect(clearNumericInput('jgfg.klhghj')).toBe('0.');
    expect(clearNumericInput('456')).toBe('456');
    expect(clearNumericInput('0.657')).toBe('0.657');
    expect(clearNumericInput('.567')).toBe('0.567');
    expect(
      clearNumericInput(`dfdhf
    .sgss7`)
    ).toBe('0.7');
  });
});

describe('function toFixedString:', () => {
  it('Returns correct value', () => {
    expect(toFixedString(456)).toBe('456');
    expect(toFixedString(456.5)).toBe('456.5');
    expect(toFixedString(456.05)).toBe('456.05');
    expect(toFixedString(456.0567)).toBe('456.06');
    expect(toFixedString(456.0)).toBe('456');
  });
});

describe('function cashData:', () => {
  it('Cash value in localstorage', () => {
    localStorage.clear();

    const key = 'TESTING_KEY';
    const value = { flag: 'Flag' };
    cashData(key, value);

    expect(cashData(key)).toEqual(value);
    localStorage.clear();
  });

  it('Returns null if key does not exist', () => {
    expect(cashData('TESTING_KEY')).toBe(null);
  });
});
