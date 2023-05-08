import { setClass } from '../../lib/helpers';
import Selector from '../Selector/Selector';
import s from './CurrencyBlock.module.scss';

export default function CurrencyBlock() {
  return (
    <form className={s.wrapper}>
      <label className={s.label} htmlFor="firstValue">
        Евро
      </label>
      <input
        className={setClass([['cm-input'], [s.input]])}
        type="text"
        id="firstValue"
        value={0}
      />
      <Selector />
    </form>
  );
}
