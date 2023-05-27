import { ConverterContext } from '../../app/Converter/controller/context';
import { setClass } from '../../lib/helpers';
import { Currency } from '../../types';
import UserRateItem from '../UserRateItem/UserRateItem';
import s from './UserRatesAdded.module.scss';
import { useContext } from 'react';

export default function UserRatesAdded() {
  const { state } = useContext(ConverterContext);
  const userRates = Object.entries(state.userRates).map(
    (entry) => entry.flat() as [string, Currency, Currency, number]
  );

  return (
    <div className={setClass([['cm-inner-block'], [s.wrapper]])}>
      <h3 className="cm-inner-block-header">Сохраненные курсы</h3>
      <ul className={s.ratesHolder}>
        {userRates.length === 0
          ? 'Пользовательские курсы отсутствуют'
          : userRates.map(([id, from, to, value]) => (
              <UserRateItem
                from={from}
                to={to}
                value={value.toString()}
                key={id}
              />
            ))}
      </ul>
    </div>
  );
}
