import { Rates } from '../../../types';
import { adapter_ErApiCom } from './adapters';

describe('function adapter_ErApiCom:', () => {
  it('Returns data object with correct props', () => {
    const data = adapter_ErApiCom({
      time_last_update_unix: 1,
      rates: {},
    });
    expect(data.updated).toBe(1000);
    expect('rates' in data).toBe(true);
    expect('time_last_update_unix' in data).toBe(false);
  });
  it('Removes rates missing in currencyNames', () => {
    const data = adapter_ErApiCom({
      time_last_update_unix: 1,
      rates: { USD: 1, GGG: 4 } as Rates,
    });

    expect('GGG' in data.rates).toBe(false);
    expect('USD' in data.rates).toBe(true);
  });
});
