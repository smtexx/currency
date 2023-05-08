import CurrencyBlock from '../CurrencyBlock/CurrencyBlock';
import HelpButton from '../HelpButton/HelpButton';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import s from './ExchangeBlock.module.scss';

export default function ExchangeBlock() {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h2 className={s.title}>Конвертировать валюту</h2>
        <HelpButton />
      </div>
      <CurrencyBlock />
      <div className="cm-direction-icon">
        <CgArrowsExchangeAltV />
      </div>
      <CurrencyBlock />
    </div>
  );
}
