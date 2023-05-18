import {
  ConverterState,
  Currency,
  Rates,
  Updated,
  UserRate,
} from '../../../types';
import {
  clearNumericInput,
  createStateCopy,
} from '../../../lib/helpers';
import { recalculateCurrencies } from './dataProcessing';
import { getRate } from './dataProcessing';
import { recalculateCurrencyBlock } from './dataProcessing';

interface ChangeValueAction {
  type: 'CHANGE_VALUE';
  payload: {
    index: number;
    value: string;
  };
}

interface ChangeCurrencyAction {
  type: 'CHANGE_CURRENCY';
  payload: {
    index: number;
    currency: Currency;
  };
}

interface UpdateRatesAction {
  type: 'UPDATE_RATES';
  payload: {
    rates: Rates;
    updated: Updated;
  };
}

interface AddUserRateAction {
  type: 'ADD_USER_RATE';
  payload: UserRate;
}

interface RemoveUserRateAction {
  type: 'REMOVE_USER_RATE';
  payload: {
    from: Currency;
    to: Currency;
  };
}

export function reducer(
  state: ConverterState,
  action:
    | ChangeValueAction
    | ChangeCurrencyAction
    | UpdateRatesAction
    | AddUserRateAction
    | RemoveUserRateAction
): ConverterState {
  const newState = createStateCopy(state);
  const { type, payload } = action;

  if (type === 'CHANGE_VALUE') {
    // Extract data
    const { index, value } = payload;

    // Clear user input and change corresponding currency block value
    const clearedInput = clearNumericInput(value);
    newState.currencyIO[index].value = clearedInput;

    // Recalculate all currency IO blocks
    recalculateCurrencies(newState, index);
  }

  if (type === 'CHANGE_CURRENCY') {
    // Extract data
    const { index, currency: to } = payload;
    const currencyBlock = newState.currencyIO[index];
    const { currency: from, value } = currencyBlock;

    // Get rate and change currency of corresponding currency block
    const rate = getRate(from, to, newState);
    currencyBlock.currency = to;

    // Recalculate corresponding currency block
    recalculateCurrencyBlock(currencyBlock, value, rate);
  }

  return newState;
}
