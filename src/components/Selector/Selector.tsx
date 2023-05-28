import { setClass } from '../../lib/helpers';
import { useContext, useEffect, useRef, useState } from 'react';
import { Currency } from '../../types';
import { currencyNames } from '../../data/currencyNames';
import s from './Selector.module.scss';
import { ConverterContext } from '../../app/Converter/controller/context';

interface Props {
  currency: string;
  onChangeCurrency: (currency: Currency) => void;
}

export default function Selector({
  currency,
  onChangeCurrency,
}: Props) {
  // Menu open state
  const [open, setOpen] = useState(false);
  // Current search value
  const [searchValue, setSearchValue] = useState('');
  // Menu ref
  const selectorRef = useRef<HTMLDivElement>(null);

  // Get available rates
  const { state } = useContext(ConverterContext);
  const availableCurrancies = Object.keys(state.rates || {}).map(
    (currency) => [currency, currencyNames[currency as Currency]]
  );

  // Add listener to document to catch clicks outside of component
  useEffect(() => {
    function closeMenu(e: MouseEvent) {
      if (
        selectorRef.current !== null &&
        !selectorRef.current.contains(e.target as Node)
      ) {
        setSearchValue('');
        setOpen(false);
      }
    }

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  // If component gets focus
  function onFocus(e: React.FocusEvent<HTMLDivElement>) {
    setOpen(true);
  }

  // If user inputs something when input is focused
  function onChangeSearchValue(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearchValue('');
    setSearchValue(e.target.value);
  }
  // If user clicks on currency button in popup menu
  function selectCurrency(currency: Currency) {
    onChangeCurrency(currency);
    setOpen(false);
  }

  const filteredItems =
    searchValue === ''
      ? availableCurrancies.slice(0, 4)
      : availableCurrancies
          .filter(
            ([currency, name]) =>
              currency
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .slice(0, 4);

  return (
    <div className={s.wrapper} ref={selectorRef}>
      <input
        className={setClass([['cm-input'], [s.input]])}
        type="text"
        value={open ? searchValue : currency}
        aria-haspopup="menu"
        onChange={onChangeSearchValue}
        onFocus={onFocus}
      />
      <ul
        className={setClass([
          [s.menu],
          ['cm-input'],
          [s.closed, !open],
        ])}
        role="menu"
        aria-label="Выбор валюты"
      >
        {filteredItems.map(([currency, name]) => (
          <li
            className={s.menuItem}
            role="presentation"
            key={currency}
          >
            <button
              className={s.button}
              type="button"
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                selectCurrency(currency as Currency);
              }}
            >
              {currency} -{' '}
              <span className={s.currencyName}>{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
