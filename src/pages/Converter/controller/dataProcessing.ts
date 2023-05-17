import { toFixedString } from '../../../lib/helpers';
import { ConverterState, UserRate } from '../../../types';

export function getUserRateHash(rate: UserRate): string {
  return rate.slice(0, 2).sort().join('_');
}

export function recalculateCurrencies(
  state: ConverterState,
  baseIndex: number
): void {
  // Get currency value and currency FROM
  const { value, currency: from } = state.currencyIO[baseIndex];

  // Start recalculate CurrenciIO blocks
  for (let i = 0; i < state.currencyIO.length; i++) {
    // Skip base block
    if (i === baseIndex) {
      continue;
    }

    // Get currency TO
    const { currency: to } = state.currencyIO[i];

    // Get exchange rate from userRates or rates
    const userRateHash = getUserRateHash([from, to, 0]);
    let rate;

    if (userRateHash in state.userRates) {
      const userRate = state.userRates[userRateHash];
      rate = userRate[0] === from ? userRate[2] : 1 / userRate[2];
    } else {
      rate =
        state.rates !== null
          ? state.rates[to] / state.rates[from]
          : 0;
    }

    // Recalculate block value if rate is not 0
    if (rate !== 0) {
      const newValue = parseFloat(value) * rate;
      state.currencyIO[i].value = toFixedString(newValue);
    }
  }
}
