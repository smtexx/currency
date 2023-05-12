import { setClass } from '../../lib/helpers';
import HelpButton from '../HelpButton/HelpButton';
import UserRateInput from '../UserRateInput/UserRateInput';
import UserRatesAdded from '../UserRatesAdded/UserRatesAdded';

export default function UserRatesBlock() {
  return (
    <div className={setClass([['cm-outer-block']])}>
      <div className="cm-outer-block-header">
        <h2>Пользовательские курсы</h2>
        <HelpButton />
      </div>
      <UserRateInput />
      <div className="cm-hide-on-tablet-m">
        <UserRatesAdded />
      </div>
    </div>
  );
}
