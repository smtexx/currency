import s from './Header.module.scss';
export default function Header() {
  return (
    <header className={s.wrapper}>
      <h1 className={s.header}>Currency Converter</h1>
    </header>
  );
}
