import { setClass } from '../../lib/helpers';
import { BiChevronsDown } from 'react-icons/bi';
import Selector from '../Selector/Selector';
import s from './UserRateInput.module.scss';
import { useState } from 'react';
import { Currency } from '../../types';
import { clearNumericInput } from '../../lib/helpers';

export default function UserRateInput() {
  const [from, setFrom] = useState<Currency>('EUR');
  const [to, setTo] = useState<Currency>('RSD');
  const [value, setValue] = useState('0');

  return (
    <form className={setClass([['cm-inner-block'], [s.wrapper]])}>
      <h3 className="cm-inner-block-header">Добавить курс</h3>
      <div className={s.fieldWrapper}>
        <label htmlFor="fromCurrency">Начальная валюта:</label>
        <Selector
          currency={from}
          onChangeCurrency={(c) => setFrom(c)}
        />
      </div>
      <div className={s.fieldWrapper}>
        <label htmlFor="fromCurrency">Конечная валюта:</label>
        <Selector currency={to} onChangeCurrency={(c) => setTo(c)} />
      </div>
      <div className={s.fieldWrapper}>
        <label htmlFor="newUserRate">По курсу:</label>
        <input
          className={setClass([['cm-input'], [s.rateValue]])}
          type="text"
          inputMode="numeric"
          id="newUserRate"
          value={value}
          onChange={(e) => {
            setValue(clearNumericInput(e.target.value));
          }}
        />
      </div>
      <button
        className={setClass([['cm-input'], [s.addButton]])}
        type="button"
      >
        Сохранить
      </button>
      <div className="cm-direction-icon">
        <BiChevronsDown />
      </div>
    </form>
  );
}
