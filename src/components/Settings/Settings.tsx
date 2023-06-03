import { RiSettings5Line } from 'react-icons/ri';
import s from './Settings.module.scss';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
import { createStateCopy, setClass } from '../../lib/helpers';
import { I_SettingsSection, config } from './config';
import Checkbox from '../Checkbox/Checkbox';

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(
    config.map((section) => section.fields)
  );

  function changeSettings(
    fieldsetIdx: number,
    fieldValue: string,
    handler: I_SettingsSection['handler']
  ) {
    const newSettings = createStateCopy(settings);
    newSettings[fieldsetIdx] = handler(
      fieldValue,
      newSettings[fieldsetIdx]
    );
    setSettings(newSettings);
  }

  return (
    <>
      <button
        className="cm-icon-button cm-link-hover"
        onClick={() => setOpen(true)}
      >
        <RiSettings5Line />
      </button>
      <Dialog open={open}>
        <header className="cm-dialog-header">
          <h2>Настройки</h2>
        </header>
        <div
          className={setClass([['cm-dialog-content'], [s.content]])}
        >
          <p className={s.tip}>
            Здесь вы можете изменять различные настройки, а также
            управлять сохранением данных приложения.
          </p>
          <form className={s.settings}>
            {config.map((fieldset, fieldsetIdx) => (
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
            ))}
          </form>

          <button className="cm-text-button">
            Установить как приложение
          </button>
        </div>
        <div className="cm-dialog-controls">
          <button
            className="cm-text-button"
            onClick={() => setOpen(false)}
          >
            Отмена
          </button>
          <button className="cm-text-button">Сохранить</button>
        </div>
      </Dialog>
    </>
  );
}
