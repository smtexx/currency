import CurrencyIO from '../CurrencyIO/CurrencyIO';
import s from './ExchangeBlock.module.scss';
import { setClass } from '../../lib/helpers';
import HelpButton from '../HelpButton/HelpButton';

export default function ExchangeBlock() {
  return (
    <div className={setClass([['cm-outer-block']])}>
      <div className="cm-outer-block-header">
        <h2>Конвертировать валюту</h2>
        <HelpButton
          text={[
            `Здесь вы можете изменять количество валюты и саму валюту блока. 
          При изменении количества валюты - происходит пересчет соседних блоков. 
          При изменении валюты блока, происходит пересчет данного блока.`,
            `Для пересчета используется сохраненный пользовательский курс, либо
          межбанковский курс, если подходящий пользовательский курс отсутствует.`,
          ]}
        />
      </div>
      <CurrencyIO />
      <CurrencyIO />
    </div>
  );
}
