import CurrencyIO from '../CurrencyIO/CurrencyIO';
import { setClass } from '../../lib/helpers';
import HelpButton from '../HelpButton/HelpButton';
import { useContext } from 'react';
import { ConverterContext } from '../../app/Converter/controller/context';

export default function ExchangeBlock() {
  const { state, dispatch } = useContext(ConverterContext);

  return (
    <div className={setClass([['cm-outer-block']])}>
      <div className="cm-outer-block-header">
        <h2>Конвертировать валюту</h2>
        <HelpButton
          text={[
            `Здесь вы можете изменять количество валюты и валюту блока. 
          При изменении количества валюты - происходит пересчет соседних блоков. 
          При изменении валюты блока, происходит пересчет данного блока.`,
            `Для пересчета используется сохраненный пользовательский курс, либо
          межбанковский курс загруженный с сервера, если подходящий пользовательский 
          курс отсутствует.`,
          ]}
        />
      </div>
      {state.currencyIO.map((config, idx) => (
        <CurrencyIO
          key={idx}
          index={idx}
          dispatch={dispatch}
          {...config}
        />
      ))}
    </div>
  );
}
