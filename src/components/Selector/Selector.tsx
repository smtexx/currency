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
            USD - Доллар США
          </button>
        </li>
        <li className={s.menuItem} role="presentation">
          <button
            className={setClass([[s.button], [s.active]])}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            EUR - Евро
          </button>
        </li>
        <li className={s.menuItem} role="presentation">
          <button
            className={s.button}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            RUB - Российский рубль
          </button>
        </li>
        <li className={s.menuItem} role="presentation">
          <button
            className={s.button}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            RSD - Сербский динар
          </button>
        </li>
        <li className={s.menuItem} role="presentation">
          <button
            className={s.button}
            type="button"
            role="menuitem"
            tabIndex={-1}
          >
            KZT - Тенге
          </button>
        </li>
      </ul>
    </div>
  );
}
