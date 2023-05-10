import { setClass } from '../../lib/helpers';
import UserRateItem from '../UserRateItem/UserRateItem';
import s from './UserRatesAdded.module.scss';

export default function UserRatesAdded() {
  return (
    <div className={setClass([['cm-inside-block'], [s.wrapper]])}>
      <h3 className={s.title}>Пользовательские курсы</h3>
      <ul className={s.ratesHolder}>
        <UserRateItem />
        <UserRateItem />
        <UserRateItem />
      </ul>
    </div>
  );
}