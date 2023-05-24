import { cashData } from '../../../lib/helpers';
import { Rates } from '../../../types';
import { adapter_ErApiCom } from './adapters';
import { endpoint_ErApiCom, fetcher_ErApiCom } from './fetchers';

interface I_RatesData {
  updated: number;
  rates: Rates;
}

interface I_FetchError {
  error: true;
}

interface I_RowRatesData {
  time_last_update_unix: number;
  rates: Rates;
}

function assertRowRatesData(
  data: unknown
): asserts data is I_RowRatesData {
  if (
    data === null ||
    typeof data !== 'object' ||
    !('time_last_update_unix' in data) ||
    !('rates' in data) ||
    typeof data['time_last_update_unix'] !== 'number'
  ) {
    throw new Error(
      'Recieved data object does not match RowRates format'
    );
  }
}

function assertRatesData(data: unknown): asserts data is I_RatesData {
  if (
    data === null ||
    typeof data !== 'object' ||
    !('updated' in data) ||
    !('rates' in data) ||
    typeof data['updated'] !== 'number'
  ) {
    throw new Error(
      'Recieved data object does not match RatesData format'
    );
  }
}

export const CASHED_RATES_KEY = 'CURRENCY_CONVERTER_RATES';

export async function fetchRates(): Promise<
  I_RatesData | I_FetchError
> {
  // Try to get cashed rates from localstorage
  try {
    const cashedRates = cashData(CASHED_RATES_KEY);
    if (cashedRates !== null) {
      assertRatesData(cashedRates);

      if (Date.now() - cashedRates.updated <= 86_400_000) {
        return cashedRates;
      }
    }
  } catch (error) {
    console.error(error);
  }

  // Get actual rates from server
  let newRates: I_RatesData;

  try {
    const fetchedData = await fetcher_ErApiCom(endpoint_ErApiCom);
    assertRowRatesData(fetchedData);
    newRates = adapter_ErApiCom(fetchedData);
  } catch (error) {
    console.error(error);
    return {
      error: true,
    };
  }

  // Save new rates data in localstorage
  try {
    cashData(CASHED_RATES_KEY, newRates);
  } catch (error) {
    console.error(error);
  }

  return newRates;
}
