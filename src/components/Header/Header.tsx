import Updated from '../Updated/Updated';
import { SiExpertsexchange } from 'react-icons/si';
import s from './Header.module.scss';

export default function Header() {
  return (
    <header className={s.wrapper}>
      <div className={s.header}>
        <span className={s.icon}>
          <SiExpertsexchange />
        </span>
        <h1 className={s.headering}>XChange_PRO</h1>
      </div>
      <p className={s.description}>Конвертер валют</p>
      <div className={s.updated}>
        <Updated />
      </div>
    </header>
  );
}
