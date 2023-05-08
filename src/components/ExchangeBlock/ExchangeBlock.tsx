import { CgArrowsExchangeAltV } from 'react-icons/cg';
import CurrencyIO from '../CurrencyIO/CurrencyIO';
import CustomBlock from '../CustomBlock/CustomBlock';

export default function ExchangeBlock() {
  return (
    <CustomBlock title="Конвертировать валюту">
      <CurrencyIO />
      <div className="cm-direction-icon">
        <CgArrowsExchangeAltV />
      </div>
      <CurrencyIO />
    </CustomBlock>
  );
}
