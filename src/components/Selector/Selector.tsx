import { setClass } from '../../lib/helpers';
import s from './Selector.module.scss';

export default function Selector() {
  return (
    <div className={s.wrapper}>
      <input
        className={setClass([['cm-input'], [s.input]])}
        type="text"
        value="EUR"
        aria-haspopup="menu"
      />
      <ul
        className={setClass([
          [s.menu],
          ['cm-input'],
          [s.closed, true],
        ])}
        role="menu"
        aria-label="Выбор валюты"
      >
        <li className={s.menuItem} role="presentation">
          <button
            className={s.button}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            USD - <span className={s.currencyName}>Доллар США</span>
          </button>
        </li>
        <li className={s.menuItem} role="presentation">
          <button
            className={setClass([[s.button], [s.active]])}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            EUR - <span className={s.currencyName}>Евро</span>
          </button>
        </li>
        <li className={s.menuItem} role="presentation">
          <button
            className={s.button}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            RUB -{' '}
            <span className={s.currencyName}>Российский рубль</span>
          </button>
        </li>
        <li className={s.menuItem} role="presentation">
          <button
            className={s.button}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            RSD -{' '}
            <span className={s.currencyName}>Сербский динар</span>
          </button>
        </li>
        <li className={s.menuItem} role="presentation">
          <button
            className={s.button}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            KZT - <span className={s.currencyName}>Тенге</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
