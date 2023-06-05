import s from './Settings.module.scss';
import { RiSettings5Line } from 'react-icons/ri';
import { useContext, useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import CustomDialog from '../CustomDialog/CustomDialog';
import { ConverterContext } from '../../app/Converter/controller/context';
import {
  initialSavingState,
  I_Field,
  E_Fields,
  handleSavingStateChange,
} from './savingState';
import { saveConverterData } from './saveConverterData';
import { setClass } from '../../lib/helpers';
import { getConverterData } from './getConverterData';

type T_SavedDataList = (
  | 'настройки приложения'
  | 'сохраненные курсы'
  | 'введенные значения'
)[];

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [tripleConversion, setTripleConversion] = useState(true);
  const [savingState, setSavingState] = useState(initialSavingState);
  const [savingError, setSavingError] = useState(false);
  const [savedDataList, setSavedDataList] = useState<T_SavedDataList>(
    []
  );
  const { state, dispatch } = useContext(ConverterContext);
  // Sync tripleConversation between app state and local state
  useEffect(() => {
    setTripleConversion(state.settings.tripleСonversion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Get list of saved data
  useEffect(() => {
    try {
      const savedDataList: T_SavedDataList = [];
      const savedData = getConverterData();
      if (savedData !== null) {
        if (savedData.userRates) {
          savedDataList.push('сохраненные курсы');
        }
        if (savedData.currencyIO) {
          savedDataList.push('введенные значения');
        }
        if (savedData.settings) {
          savedDataList.push('настройки приложения');
        }
      }
      setSavedDataList(savedDataList);
    } catch (error) {
      console.error(error);
      setSavedDataList([]);
    }
  }, [open]);

  function saveSettings() {
    if (tripleConversion !== state.settings.tripleСonversion) {
      dispatch({
        type: 'SET_TRIPLE_CONVERSION',
        payload: tripleConversion,
      });
    }

    const isSaved = saveConverterData(savingState, state);
    if (isSaved) {
      // Close settings menu
      setOpen(false);
      setSavingError(false);
    } else {
      setSavingError(true);
    }
  }

  function closeSettings() {
    setOpen(false);
    setSavingError(false);
  }

  function hadleInstall() {
    const event = state.installprompt;
    if (
      event !== null &&
      'prompt' in event &&
      typeof event.prompt === 'function'
    ) {
      event.prompt();
    }
  }

  return (
    <>
      <button
        className={setClass([
          ['cm-icon-button'],
          ['cm-link-hover'],
          [s.settingsBtn],
        ])}
        onClick={() => setOpen(true)}
      >
        <RiSettings5Line />
      </button>
      <CustomDialog
        title="Настройки"
        open={open}
        controls={
          <>
            <button
              className="cm-text-button"
              onClick={closeSettings}
            >
              Отмена
            </button>
            <button className="cm-text-button" onClick={saveSettings}>
              Сохранить
            </button>
          </>
        }
      >
        <div className={s.content}>
          <p className={s.tip}>
            Здесь вы можете изменять количество блоков для конвертации
            валют, а также управлять сохранением данных приложения.
            Сохраненные данные хранятся в браузере, и будут
            загружаться при повторном запуске приложения.
          </p>

          <form className={s.settings}>
            <fieldset>
              <legend>Конвертация</legend>
              <label id="tripleConversion">
                Дополнительный блок
                <Checkbox
                  checked={tripleConversion}
                  labelID="tripleConversion"
                  onChange={() =>
                    setTripleConversion(!tripleConversion)
                  }
                />
              </label>
            </fieldset>
            <fieldset>
              <legend>Сохранение</legend>
              {(
                Object.entries(savingState) as [E_Fields, I_Field][]
              ).map(([key, field]) => (
                <label id={key} key={key}>
                  {field.label}
                  <Checkbox
                    checked={field.checked}
                    labelID={key}
                    onChange={() =>
                      setSavingState(
                        handleSavingStateChange(savingState, key)
                      )
                    }
                  />
                </label>
              ))}

              {/* Show saved data list */}
              <p className={s.savedDataList}>
                <span>Сохраненны данные: </span>
                {savedDataList.length === 0
                  ? 'отсутствуют'
                  : savedDataList.join(', ')}
                .
              </p>

              {/* Error message if localstorage is not available */}
              {!savingError ? null : (
                <p className={s.savingError}>
                  К сожалению, ваш браузер не поддерживает сохранение
                  данных.
                </p>
              )}
            </fieldset>
          </form>

          {state.installprompt === null ? (
            <p className={s.tip}>
              Вы можете установить наше приложение локально на ваше
              устройство. Запуск такого приложения будет происходить
              быстрее а использование удобнее. Чтобы узнать как это
              сделать на вашем устройстве, выполните поиск в
              интерненте по запросу PWA (Progressive Web Application).
            </p>
          ) : (
            <>
              <p className={s.tip}>
                Вы можете установить наше приложение локально на ваше
                устройство. Для этого нажмите конпку ниже. Чтобы
                узнать как это работает, выполните поиск в интерненте
                по запросу PWA (Progressive Web Application).
              </p>
              <button
                className="cm-text-button"
                onClick={hadleInstall}
              >
                Установить приложение
              </button>
            </>
          )}
        </div>
      </CustomDialog>
    </>
  );
}
