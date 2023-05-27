import { BiChevronsRight } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import s from './UserRateItem.module.scss';
import { setClass } from '../../lib/helpers';
import { Currency } from '../../types';
import { ConverterContext } from '../../app/Converter/controller/context';
import { useContext } from 'react';

interface I_Props {
  from: Currency;
  to: Currency;
  value: string;
}

export default function UserRateItem({ from, to, value }: I_Props) {
  const { dispatch } = useContext(ConverterContext);

  function removeRate() {
    dispatch({
      type: 'REMOVE_USER_RATE',
      payload: {
        from,
        to,
      },
    });
  }

  return (
    <li className={s.wrapper}>
      <span className={s.currency}>{from}</span>
      <span className={s.arrow}>
        <BiChevronsRight />
      </span>
      <span className={s.currency}>{to}</span>
      <span className={s.arrow}>
        <BiChevronsRight />
      </span>
      <span className={s.value}>{value}</span>
      <button
        className={setClass([['cm-link-hover'], [s.close]])}
        onClick={removeRate}
      >
        <IoCloseSharp />
      </button>
    </li>
  );
}
