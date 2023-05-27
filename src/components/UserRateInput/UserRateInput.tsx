import { setClass } from '../../lib/helpers';
import { BiChevronsDown } from 'react-icons/bi';
import Selector from '../Selector/Selector';
import s from './UserRateInput.module.scss';
import { useState, useContext } from 'react';
import { Currency } from '../../types';
import { clearNumericInput } from '../../lib/helpers';
import { ConverterContext } from '../../app/Converter/controller/context';

export default function UserRateInput() {
  const [from, setFrom] = useState<Currency>('EUR');
  const [to, setTo] = useState<Currency>('RSD');
  const [value, setValue] = useState('0');
  const { dispatch } = useContext(ConverterContext);

  function saveUserRate() {
    if (value !== '0') {
      dispatch({
        type: 'ADD_USER_RATE',
        payload: {
          rate: value,
          from,
          to,
        },
      });
    }
  }

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
        onClick={saveUserRate}
      >
        Сохранить
      </button>
      <div className="cm-direction-icon">
        <BiChevronsDown />
      </div>
    </form>
  );
}
