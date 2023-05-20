import { currencyNames } from '../../../data/currencyNames';
import { Rates, Updated } from '../../../types';

export function adapter_ErApiCom(data: object): {
  updated: Updated;
  rates: Rates;
} {
  // Extract data
  if (
    'time_last_update_unix' in data &&
    typeof data.time_last_update_unix === 'number' &&
    'rates' in data
  ) {
    const { time_last_update_unix, rates: rowRates } = data;

    // Process updated date
    const updated = time_last_update_unix * 1000;
    // Delete all unknown rates
    const rates = deleteUnknownRates(
      rowRates as Rates,
      currencyNames
    );

    return {
      updated,
      rates,
    };
  } else {
    throw new Error(
      'Wrong format of data argument in adapter_ErApiCom function'
    );
  }
}

function deleteUnknownRates(
  rates: Rates,
  names: typeof currencyNames
): Rates {
  const entries = Object.entries(rates);
  const filtered = entries.filter(([name]) => name in names);
  return Object.fromEntries(filtered);
}
