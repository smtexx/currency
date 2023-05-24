import { CASHED_RATES_KEY, fetchRates } from './fetchRates';

describe('async function getRates:', () => {
  it('Fetches data and save it in localstorage', async () => {
    localStorage.clear();
    const data = await fetchRates();
    const cashedData = JSON.parse(
      localStorage.getItem(CASHED_RATES_KEY) as string
    );
    expect('rates' in data).toBe(true);
    expect('updated' in data).toBe(true);
    expect(cashedData).toEqual(data);
    localStorage.clear();
  });
  it('Gets data from cash', async () => {
    localStorage.clear();
    const data = await fetchRates();
    if ('rates' in data && 'USD' in data.rates) {
      data.rates.USD = 555;
    }
    localStorage.setItem(CASHED_RATES_KEY, JSON.stringify(data));
    const newData = (await fetchRates()) as any;
    expect(newData.rates.USD).toBe(555);
  });
});
