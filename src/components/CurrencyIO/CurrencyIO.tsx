import { setClass } from '../../lib/helpers';
import Selector from '../Selector/Selector';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import s from './CurrencyIO.module.scss';
import { Currency } from '../../types';
import { Dispatch } from '../../app/Converter/controller/reducer';
import { currencyNames } from '../../data/currencyNames';

interface Props {
  index: number;
  currency: Currency;
  value: string;
  dispatch: Dispatch;
}

export default function CurrencyIO({
  index,
  currency,
  value,
  dispatch,
}: Props) {
  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'CHANGE_VALUE',
      payload: {
        value: e.target.value,
        index,
      },
    });
  }

  function onChangeCurrency(currency: Currency) {
    dispatch({
      type: 'CHANGE_CURRENCY',
      payload: {
        currency: currency,
        index,
      },
    });
  }
  return (
    <form className={setClass([['cm-inner-block']])}>
      <label className={s.label} htmlFor="currencyValue">
        {currencyNames[currency]}
      </label>
      <div className={s.field}>
        <div className={s.inputWrapper}>
          {/* Wrapper limits input width */}
          <input
            className={setClass([['cm-input'], [s.input]])}
            type="text"
            inputMode="numeric"
            id="currencyValue"
            value={value}
            onChange={onValueChange}
          />
        </div>
        <Selector
          currency={currency}
          onChangeCurrency={onChangeCurrency}
        />
        <div className="cm-direction-icon">
          <CgArrowsExchangeAltV />
        </div>
      </div>
    </form>
  );
}
