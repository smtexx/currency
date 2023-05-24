import { currencyNames } from '../../../data/currencyNames';
import { Rates, Updated } from '../../../types';

export function adapter_ErApiCom(fetchedData: {
  time_last_update_unix: number;
  rates: Rates;
}): {
  updated: Updated;
  rates: Rates;
} {
  // Extract data
  const { time_last_update_unix, rates: rowRates } = fetchedData;
  // Process updated date
  const updated = time_last_update_unix * 1000;
  // Delete all unknown rates
  const rates = deleteUnknownRates(rowRates, currencyNames);

  return {
    updated,
    rates,
  };
}

// Delete rates that are missing in currencyNames
export function deleteUnknownRates(
  rates: Rates,
  names: typeof currencyNames
): Rates {
  const entries = Object.entries(rates);
  const filtered = entries.filter(([name]) => name in names);
  return Object.fromEntries(filtered);
}
