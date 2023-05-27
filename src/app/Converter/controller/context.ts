import { createContext } from 'react';
import { ConverterState } from '../../../types';
import { initialState } from './initialState';
import { Dispatch } from './reducer';

export const ConverterContext = createContext<{
  state: ConverterState;
  dispatch: Dispatch;
}>({
  state: initialState,
  dispatch: () => {},
});
