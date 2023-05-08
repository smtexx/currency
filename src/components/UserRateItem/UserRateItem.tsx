import { BiChevronsRight } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import s from './UserRateItem.module.scss';

export default function UserRateItem() {
  return (
    <li className={s.wrapper}>
      <span className={s.currency}>EUR</span>
      <span className={s.arrow}>
        <BiChevronsRight />
      </span>
      <span className={s.currency}>RSD</span>
      <span className={s.arrow}>
        <BiChevronsRight />
      </span>
      <span className={s.value}>117.5</span>
      <button className={s.close}>
        <IoCloseSharp />
      </button>
    </li>
  );
}
