import { setClass } from '../../lib/helpers';
import Selector from '../Selector/Selector';
import s from './CurrencyBlock.module.scss';

export default function CurrencyBlock() {
  return (
    <form className={s.wrapper}>
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
