import s from './Settings.module.scss';
import { RiSettings5Line } from 'react-icons/ri';
import { useContext, useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import CustomDialog from '../CustomDialog/CustomDialog';
import { ConverterContext } from '../../app/Converter/controller/context';

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [tripleConversion, setTripleConversion] = useState(true);
  const { state, dispatch } = useContext(ConverterContext);

  // Sync tripleConversation between app state and local state
  useEffect(() => {
    setTripleConversion(state.settings.tripleСonversion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function saveSettings() {
    dispatch({
      type: 'SET_TRIPLE_CONVERSION',
      payload: tripleConversion,
    });

    // Close settings menu
    setOpen(false);
  }

  // const [settings, setSettings] = useState(
  //   config.map((section) => section.fields)
  // );

  // function changeSettings(
  //   fieldsetIdx: number,
  //   fieldValue: string,
  //   handler: I_SettingsSection['handler']
  // ) {
  //   const newSettings = createStateCopy(settings);
  //   newSettings[fieldsetIdx] = handler(
  //     fieldValue,
  //     newSettings[fieldsetIdx]
  //   );
  //   setSettings(newSettings);
  // }

  return (
    <>
      <button
        className="cm-icon-button cm-link-hover"
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
              onClick={() => setOpen(false)}
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
            Здесь вы можете изменять различные настройки, а также
            управлять сохранением данных приложения.
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
            {/* {config.map((fieldset, fieldsetIdx) => (
              <fieldset key={fieldsetIdx}>
                <legend>{fieldset.legend}</legend>
                {fieldset.fields.map((field, fieldIdx) => {
                  const ID = `settings_field_${field.value}`;
                  const { checked, value } =
                    settings[fieldsetIdx][fieldIdx];
                  return (
                    <label id={ID} key={field.value}>
                      {field.label}
                      <Checkbox
                        checked={checked}
                        labelID={ID}
                        onChange={() =>
                          changeSettings(
                            fieldsetIdx,
                            value,
                            fieldset.handler
                          )
                        }
                      />
                    </label>
                  );
                })}
              </fieldset>
            ))} */}
          </form>
        </div>
      </CustomDialog>
    </>
  );
}
