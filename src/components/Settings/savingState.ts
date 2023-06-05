import { createStateCopy } from '../../lib/helpers';

export enum E_Fields {
  SAVE_USER_RATES = 'SAVE_USER_RATES',
  SAVE_EXCHANGE_DATA = 'SAVE_EXCHANGE_DATA',
  SAVE_APP_SETTINGS = 'SAVE_APP_SETTINGS',
  CLEAR_ALL_SETTINGS = 'CLEAR_ALL_SETTINGS',
}

export interface I_Field {
  label: string;
  checked: boolean;
}

export type T_SavingState = {
  [key in E_Fields]: I_Field;
};

export const initialSavingState: T_SavingState = {
  [E_Fields.SAVE_USER_RATES]: {
    label: 'Сохраненные курсы',
    checked: false,
  },
  [E_Fields.SAVE_EXCHANGE_DATA]: {
    label: 'Введенные значения',
    checked: false,
  },
  [E_Fields.SAVE_APP_SETTINGS]: {
    label: 'Настройки приложения',
    checked: false,
  },
  [E_Fields.CLEAR_ALL_SETTINGS]: {
    label: 'Удалить все настройки',
    checked: false,
  },
};

export function handleSavingStateChange(
  initialState: T_SavingState,
  field: E_Fields
): T_SavingState {
  const newState = createStateCopy(initialState);
  const clearStateField = newState.CLEAR_ALL_SETTINGS;

  if (
    field === E_Fields.CLEAR_ALL_SETTINGS &&
    !clearStateField.checked
  ) {
    if (!clearStateField.checked) {
      (Object.keys(newState) as E_Fields[]).forEach((key) => {
        if (key !== E_Fields.CLEAR_ALL_SETTINGS) {
          newState[key].checked = false;
        }
      });
      clearStateField.checked = true;
    }
  } else {
    newState[field].checked = !newState[field].checked;
    clearStateField.checked = false;
  }

  return newState;
}
