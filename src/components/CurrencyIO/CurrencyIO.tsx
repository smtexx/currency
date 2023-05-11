import { setClass } from '../../lib/helpers';
import Selector from '../Selector/Selector';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import s from './CurrencyIO.module.scss';

export default function CurrencyIO() {
  return (
    <form className={setClass([['cm-inner-block'], [s.wrapper]])}>
      <label className={s.label} htmlFor="currencyValue">
        Евро
      </label>
      <div className={s.field}>
        <div className={s.inputWrapper}>
          {/* Wrapper limits input width */}
          <input
            className={setClass([['cm-input'], [s.input]])}
            type="number"
            id="currencyValue"
            value={0}
          />
        </div>
        <Selector />
        <div className="cm-direction-icon">
          <CgArrowsExchangeAltV />
        </div>
      </div>
    </form>
  );
}
