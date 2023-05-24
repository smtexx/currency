import { endpoint_ErApiCom, fetcher_ErApiCom } from './fetchers';

describe('function fetcher_ErApiCom:', () => {
  it('Fetches data from endpoint.', async () => {
    const data = (await fetcher_ErApiCom(endpoint_ErApiCom)) as any;
    expect(typeof data.time_last_update_unix).toBe('number');
    expect('rates' in data).toBe(true);
  });

  it('Throws if unable to fetch', async () => {
    let error: Error | undefined;

    await fetcher_ErApiCom(
      'https://open.er-ai.com/v6/latest/USD'
    ).catch((e) => (error = e));

    expect(error).toBeInstanceOf(Error);
  });
});
