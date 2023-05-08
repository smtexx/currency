import { setClass } from '../../lib/helpers';
import Selector from '../Selector/Selector';
import s from './CurrencyIO.module.scss';

export default function CurrencyIO() {
  return (
    <form className={setClass([['cm-inside-block'], [s.wrapper]])}>
      <label className={s.label} htmlFor="currencyValue">
        Евро
      </label>
      <input
        className={setClass([['cm-input'], [s.input]])}
        type="number"
        id="currencyValue"
        value={0}
      />
      <Selector />
    </form>
  );
}
