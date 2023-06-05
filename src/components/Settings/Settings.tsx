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

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [tripleConversion, setTripleConversion] = useState(true);
  const [savingState, setSavingState] = useState(initialSavingState);
  const [savingError, setSavingError] = useState(false);
  const { state, dispatch } = useContext(ConverterContext);

  // Sync tripleConversation between app state and local state
  useEffect(() => {
    setTripleConversion(state.settings.tripleСonversion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function saveSettings() {
    if (tripleConversion !== state.settings.tripleСonversion) {
      dispatch({
        type: 'SET_TRIPLE_CONVERSION',
        payload: tripleConversion,
      });
    }

    const isSaved = saveConverterData(
      savingState,
      state,
      tripleConversion
    );
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
              {!savingError ? null : (
                <p className={s.savingError}>
                  К сожалению, ваш браузер не поддерживает сохранение
                  данных.
                </p>
              )}
            </fieldset>
          </form>
        </div>
      </CustomDialog>
    </>
  );
}
