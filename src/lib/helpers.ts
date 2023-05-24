type ClassName = string | undefined;
type AloneClass = [ClassName];
type OptionalClass = [ClassName, boolean];
type TernaryClass = [ClassName, ClassName, boolean];
type ClassConfig = AloneClass | OptionalClass | TernaryClass;

// Function calculates class name based on config argument
export function setClass(config: ClassConfig[]): string {
  // Throw error if one of arguments is undefined
  config.forEach((className) => {
    if (className.includes(undefined)) {
      throw new Error(
        `SetClass: one of arguments in config is undefined`
      );
    }
  });

  // eslint-disable-next-line array-callback-return
  const newClassName = config.reduce((classPart, configPart) => {
    switch (configPart.length) {
      case 1:
        return `${classPart} ${configPart[0]}`;
      case 2:
        return configPart[1]
          ? `${classPart} ${configPart[0]}`
          : classPart;
      case 3:
        return configPart[2]
          ? `${classPart} ${configPart[0]}`
          : `${classPart} ${configPart[1]}`;
    }
  }, '');

  return newClassName.trim();
}

// Creates object copy using JSON object
export function createStateCopy<State>(state: State): State {
  return JSON.parse(JSON.stringify(state));
}

// Formats string before parsing float number,
// trailing zeros are NOT truncated
export function clearNumericInput(value: string): string {
  if (value === '') {
    return '0';
  }
  if (value === '.') {
    return '0.';
  }

  let firstDot = true;
  const cleared = value
    // Remove all non numeric symbols, except dot and comma
    .replace(/[^\d.,]/g, '')
    // Replace comma to dot, if it exists
    .replace(/,/g, '.')
    // Delete all dots except the first
    .replace(/\./g, () => {
      if (firstDot) {
        firstDot = false;
        return '.';
      } else {
        return '';
      }
    })
    // Delete leading zeros before numbers
    .replace(/^0+(?=[1-9])/, '')
    // Replace repeated leading zeros before dot to single
    .replace(/^0{2,}(?=\.)/, '0')
    // Add 0 if string starts with dot
    .replace(/^\./, '0.');

  // If all symbols deleted, return 0
  if (cleared.length === 0) {
    return '0';
  }

  return cleared;
}

// Converts a number type argument to a string type with
// an accuracy of 2 decimal places. Trailing zeros are truncated.
export function toFixedString(value: number): string {
  return value.toFixed(2).replace(/\.?0*$/, '');
}

// Cash data in localstorage
export function cashData(key: string): unknown;
export function cashData(key: string, data: any): void;
export function cashData(key: string, data?: any) {
  if (!localStorage) {
    throw new Error('Localstorage is not available for cashing');
  }

  if (!data) {
    const storedData = localStorage.getItem(key);
    return storedData !== null ? JSON.parse(storedData) : null;
  }

  const dataString = JSON.stringify(data);
  localStorage.setItem(key, dataString);
}
