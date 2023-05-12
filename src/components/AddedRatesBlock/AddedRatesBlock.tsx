import { setClass } from '../../lib/helpers';
import HelpButton from '../HelpButton/HelpButton';
import UserRatesAdded from '../UserRatesAdded/UserRatesAdded';
import s from './AddedRatesBlock.module.scss';

export default function AddedRatesBlock() {
  return (
    <div className={setClass([['cm-outer-block'], [s.wrapper]])}>
      <div className="cm-outer-block-header">
        <h2>Сохраненные курсы</h2>
        <HelpButton />
      </div>
      <UserRatesAdded />
    </div>
  );
}
