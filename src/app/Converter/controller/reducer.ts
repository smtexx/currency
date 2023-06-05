import {
  ConverterState,
  ConverterStatus,
  Currency,
  Rates,
  Updated,
  UserRate,
} from '../../../types';
import {
  clearNumericInput,
  createStateCopy,
} from '../../../lib/helpers';
import {
  getUserRateHash,
  isUserRateActive,
  recalculateCurrencies,
} from './dataProcessing';
import { getRate } from './dataProcessing';
import { recalculateCurrencyBlock } from './dataProcessing';
import { I_ConverterSavedData } from '../../../components/Settings/saveConverterData';

export interface ChangeValueAction {
  type: 'CHANGE_VALUE';
  payload: {
    index: number;
    value: string;
  };
}

export interface ChangeCurrencyAction {
  type: 'CHANGE_CURRENCY';
  payload: {
    index: number;
    currency: Currency;
  };
}

export interface AddUserRateAction {
  type: 'ADD_USER_RATE';
  payload: {
    from: Currency;
    to: Currency;
    rate: string;
  };
}

export interface RemoveUserRateAction {
  type: 'REMOVE_USER_RATE';
  payload: {
    from: Currency;
    to: Currency;
  };
}

export type UpdateRatesActionPayload =
  | {
      status: ConverterStatus.READY;
      rates: Rates;
      updated: Updated;
    }
  | {
      status: ConverterStatus.ERROR | ConverterStatus.UPDATING;
    };

export interface UpdateRatesAction {
  type: 'UPDATE_STATUS';
  payload: UpdateRatesActionPayload;
}

export interface ShowTipAction {
  type: 'SHOW_TIP';
  payload: {
    text: string[];
  };
}

export interface HideTipAction {
  type: 'HIDE_TIP';
  payload: null;
}

export interface SetTripleСonversionAction {
  type: 'SET_TRIPLE_CONVERSION';
  payload: boolean;
}

export interface RestoreData {
  type: 'RESTORE_DATA';
  payload: I_ConverterSavedData;
}

type Actions =
  | ChangeValueAction
  | ChangeCurrencyAction
  | UpdateRatesAction
  | AddUserRateAction
  | RemoveUserRateAction
  | ShowTipAction
  | HideTipAction
  | SetTripleСonversionAction
  | RestoreData;

export type Dispatch = React.Dispatch<Actions>;

export function reducer(
  state: ConverterState,
  action: Actions
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

  if (type === 'ADD_USER_RATE') {
    // Extract data
    const { from, to, rate } = payload;

    if (from !== to) {
      // Create new UserRate object
      const userRate = [
        from,
        to,
        parseFloat(clearNumericInput(rate)),
      ] as UserRate;

      // Get hash of user rate object and save it into state
      const hash = getUserRateHash(userRate);
      newState.userRates[hash] = userRate;

      // If there are blocks using user rates, recalculate all
      const baseIndex = isUserRateActive(newState, from, to);
      if (baseIndex !== -1) {
        recalculateCurrencies(newState, baseIndex);
      }
    }
  }

  if (type === 'REMOVE_USER_RATE') {
    // Extract data
    const { from, to } = payload;

    const baseIndex = isUserRateActive(newState, from, to);
    console.log(baseIndex, from, to);

    const hash = getUserRateHash([from, to, 0]);
    delete newState.userRates[hash];

    // If removed user rate was active, recalculate currency blocks
    if (baseIndex !== -1) {
      recalculateCurrencies(newState, baseIndex);
    }
  }

  if (type === 'UPDATE_STATUS') {
    if (payload.status === ConverterStatus.READY) {
      const { rates, updated } = payload;

      // Save loaded rate and last update date
      newState.status = ConverterStatus.READY;
      newState.updated = updated;
      newState.rates = rates;

      // Recalculate currency blocks by index 0
      recalculateCurrencies(newState, 0);
    } else {
      newState.status = payload.status;
    }
  }

  if (type === 'SHOW_TIP') {
    newState.tip = payload.text;
  }

  if (type === 'HIDE_TIP') {
    newState.tip = null;
  }

  if (type === 'SET_TRIPLE_CONVERSION') {
    if (payload && !newState.settings.tripleСonversion) {
      newState.settings.tripleСonversion = true;
      newState.currencyIO.push({ currency: 'RUB', value: '0' });
      recalculateCurrencies(newState, 0);
    }
    if (!payload && newState.settings.tripleСonversion) {
      newState.settings.tripleСonversion = false;
      newState.currencyIO = newState.currencyIO.slice(0, 2);
    }
  }

  if (type === 'RESTORE_DATA') {
    if (payload.userRates) {
      newState.userRates = payload.userRates;
    }
    if (payload.currencyIO) {
      newState.currencyIO = payload.currencyIO;
    }
  }

  return newState;
}
