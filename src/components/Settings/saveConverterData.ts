import { ConverterState } from '../../types';
import { T_SavingState } from './savingState';
import { CONVERTER_SAVED_DATA_KEY } from './storageKey';

export interface I_ConverterSavedData {
  rates?: ConverterState['rates'];
  userRates?: ConverterState['userRates'];
  currencyIO?: ConverterState['currencyIO'];
  settings?: ConverterState['settings'];
}

export function saveConverterData(
  savingState: T_SavingState,
  appState: ConverterState
): boolean {
  try {
    // Clear all data
    if (savingState.CLEAR_ALL_SETTINGS.checked) {
      localStorage.removeItem(CONVERTER_SAVED_DATA_KEY);
      return true;
    }

    const dataToSave: I_ConverterSavedData = {};
    if (savingState.SAVE_RATES.checked && appState.rates !== null) {
      dataToSave.rates = appState.rates;
    }
    if (
      savingState.SAVE_USER_RATES.checked &&
      Object.keys(appState.userRates).length !== 0
    ) {
      dataToSave.userRates = appState.userRates;
    }
    if (savingState.SAVE_EXCHANGE_DATA.checked) {
      dataToSave.currencyIO = appState.currencyIO;
    }
    if (savingState.SAVE_APP_SETTINGS.checked) {
      dataToSave.settings = appState.settings;
    }

    if (Object.keys(dataToSave).length !== 0) {
      localStorage.setItem(
        CONVERTER_SAVED_DATA_KEY,
        JSON.stringify(dataToSave)
      );
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
