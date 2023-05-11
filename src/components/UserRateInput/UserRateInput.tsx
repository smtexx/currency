import { setClass } from '../../lib/helpers';
import { BiChevronsDown } from 'react-icons/bi';
import Selector from '../Selector/Selector';
import s from './UserRateInput.module.scss';

export default function UserRateInput() {
  return (
    <form className={setClass([['cm-inner-block'], [s.wrapper]])}>
      <h3 className="cm-inner-block-header">Добавить курс</h3>
      <div className={s.fieldWrapper}>
        <label htmlFor="fromCurrency">Начальная валюта:</label>
        <Selector />
      </div>
      <div className={s.fieldWrapper}>
        <label htmlFor="fromCurrency">Конечная валюта:</label>
        <Selector />
      </div>
      <div className={s.fieldWrapper}>
        <label htmlFor="newUserRate">По курсу:</label>
        <input
          className={setClass([['cm-input'], [s.rateValue]])}
          type="number"
          id="newUserRate"
          value={0}
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
