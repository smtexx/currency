import { RiExchangeDollarFill } from 'react-icons/ri';
import s from './Updated.module.scss';
import HelpButton from '../HelpButton/HelpButton';

export default function Updated() {
  return (
    <p className={s.wrapper}>
      <span className={s.icon}>
        <RiExchangeDollarFill />
      </span>{' '}
      <span className={s.text}>Обновлено: 14.04 - 02:45</span>
      <span className={s.button}>
        <HelpButton />
      </span>
    </p>
  );
}
