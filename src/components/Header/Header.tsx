import Updated from '../Updated/Updated';
import s from './Header.module.scss';
export default function Header() {
  return (
    <header className={s.wrapper}>
      <h1 className={s.header}>Currency Converter</h1>
      <div className={s.updated}>
        <Updated />
      </div>
    </header>
  );
}
