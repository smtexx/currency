import { createContext } from 'react';
import { ConverterState } from '../../../types';
import { initialState } from './initialState';
import {
  ChangeValueAction,
  ChangeCurrencyAction,
  UpdateRatesAction,
  AddUserRateAction,
  RemoveUserRateAction,
} from './reducer';

export const ConverterContext = createContext<{
  state: ConverterState;
  dispatch: React.Dispatch<
    | ChangeValueAction
    | ChangeCurrencyAction
    | UpdateRatesAction
    | AddUserRateAction
    | RemoveUserRateAction
  >;
}>({
  state: initialState,
  dispatch: () => {},
});
