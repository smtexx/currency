import { toFixedString } from '../../../lib/helpers';
import {
  ConverterState,
  Currency,
  CurrencyIO,
  UserRate,
} from '../../../types';

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
    // Get exchange rate
    const rate = getRate(from, to, state);
    // Recalculate current block based on value and exchange rate
    recalculateCurrencyBlock(state.currencyIO[i], value, rate);
  }
}

// Returns exchange rate based on userRates and rates
export function getRate(
  from: Currency,
  to: Currency,
  state: ConverterState
): number {
  // Get exchange rate from userRates or rates
  const userRateHash = getUserRateHash([from, to, 0]);
  let rate;

  if (userRateHash in state.userRates) {
    const userRate = state.userRates[userRateHash];
    rate = userRate[0] === from ? userRate[2] : 1 / userRate[2];
  } else {
    rate =
      state.rates !== null ? state.rates[to] / state.rates[from] : 0;
  }

  return rate;
}

// Recalculate block value if rate is not 0
export function recalculateCurrencyBlock(
  currencyBlock: CurrencyIO,
  value: string,
  rate: number
): void {
  if (rate !== 0) {
    const newValue = parseFloat(value) * rate;
    currencyBlock.value = toFixedString(newValue);
  }
}

// If both currencies are used in currency blocks
// returns index of block "from", otherwise returns -1
export function isUserRateActive(
  state: ConverterState,
  from: Currency,
  to: Currency
): number {
  const fromBlockIndex = state.currencyIO.findIndex(
    (block) => block.currency === from
  );
  const toBlockIndex = state.currencyIO.findIndex(
    (block) => block.currency === to
  );

  const isActive = fromBlockIndex !== -1 && toBlockIndex !== -1;
  return isActive ? fromBlockIndex : -1;
}
