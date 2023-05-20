import { currencyNames } from '../../../data/currencyNames';
import { Rates, Updated } from '../../../types';
import { adapter_ErApiCom } from './adapter';
import { endpoint } from './endpoint';
import { fetchRates } from './fetchRates';

describe('async function fetchRates:', () => {
  it('Fetches data from endpoint', async () => {
    const correctData = (await fetchRates(
      endpoint,
      adapter_ErApiCom
    )) as { updated: Updated; rates: Rates };

    // Has required properties
    expect(correctData).toHaveProperty('updated');
    expect(correctData).toHaveProperty('rates');

    // Correct last updated time
    expect(typeof correctData.updated).toBe('number');
    expect(correctData.updated.toString().length).toBe(13);

    // Correct rates
    expect(Object.keys(correctData.rates)).toEqual(
      expect.arrayContaining(Object.keys(currencyNames))
    );
  });

  it('Returns object with error prop, if unable to fetch', async () => {
    const errorData = (await fetchRates(
      'https://open.er-api.com/wow/latest/USD',
      adapter_ErApiCom
    )) as { error: boolean };

    expect(errorData.error).toBe(true);
  });
});
