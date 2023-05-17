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
    const { index, value } = payload;
    // Clear user input
    const clearedInput = clearNumericInput(value);
    // Change current value in new state
    newState.currencyIO[index].value = clearedInput;
    // Recalculate currency IO blocks
    recalculateCurrencies(newState, index);
  }

  return newState;
}
