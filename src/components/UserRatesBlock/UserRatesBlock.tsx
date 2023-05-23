import { setClass } from '../../lib/helpers';
import HelpButton from '../HelpButton/HelpButton';
import UserRateInput from '../UserRateInput/UserRateInput';
import UserRatesAdded from '../UserRatesAdded/UserRatesAdded';

export default function UserRatesBlock() {
  return (
    <div className={setClass([['cm-outer-block']])}>
      <div className="cm-outer-block-header">
        <h2>Пользовательские курсы</h2>
        <HelpButton
          text={[
            `Здесь вы можете добавить свой курс валют. Например, вам нужно 
          поменять деньги в обменнике. Вы добавляете здесь курс конкретного 
          обменника, и конвертация валют осуществляется с учетом этого курса.`,
            `При добавлении нового курса происходит пересчет курса валют, если этот 
          курс задействован в соответствующих блоках.`,
            `Сохраненные курсы отображаются в соответствующем блоке.`,
            `Правильный формат курса: USD > RUB > 72.3.`,
          ]}
        />
      </div>
      <UserRateInput />
      <div className="cm-hide-on-tablet-m">
        <UserRatesAdded />
      </div>
    </div>
  );
}
