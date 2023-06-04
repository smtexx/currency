import { I_ConverterSavedData } from './saveConverterData';
import { CONVERTER_SAVED_DATA_KEY } from './storageKey';

export function getConverterData(): I_ConverterSavedData | null {
  try {
    const data = localStorage.getItem(CONVERTER_SAVED_DATA_KEY);
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
