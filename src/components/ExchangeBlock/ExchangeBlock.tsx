import CurrencyIO from '../CurrencyIO/CurrencyIO';
import s from './ExchangeBlock.module.scss';
import { setClass } from '../../lib/helpers';
import HelpButton from '../HelpButton/HelpButton';

export default function ExchangeBlock() {
  return (
    <div className={setClass([['cm-outer-block'], [s.wrapper]])}>
      <div className="cm-outer-block-header">
        <h2>Конвертировать валюту</h2>
        <HelpButton />
      </div>
      <CurrencyIO />
      <CurrencyIO />
    </div>
  );
}
