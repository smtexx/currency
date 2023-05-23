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
            `Здесь вы можете добавить свой курс валют. Например, если вам нужно 
          поменять деньги в обменнике. При сохранении вашего курса, дальнейшая конвертация 
          валют осуществляется с учетом этого курса.`,
            `При добавлении нового курса, происходит пересчет количества валюты в блоке, 
          валюта которого совпадает с валютой добавленного курса. Сохраненные курсы отображаются в 
          соответствующем блоке.`,
            `Формат курса: USD>RUB>72.3.`,
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
