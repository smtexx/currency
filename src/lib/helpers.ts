type AloneClass = [string];
type OptionalClass = [string, boolean];
type TernaryClass = [string, string, boolean];
type ClassConfig = AloneClass | OptionalClass | TernaryClass;

export function setClass(config: ClassConfig[]): string {
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
