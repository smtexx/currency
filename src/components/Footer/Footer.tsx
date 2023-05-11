import s from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={s.wrapper}>
      <p className={s.text}>
        Thanks to{' '}
        <a
          href="mailto:smtexx@hotmail.com"
          className="cm-link cm-link-hover"
          rel="noreferrer noopener"
        >
          smtexx@hotmail.com
        </a>
      </p>
    </footer>
  );
}
