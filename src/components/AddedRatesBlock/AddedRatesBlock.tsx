import { setClass } from '../../lib/helpers';
import HelpButton from '../HelpButton/HelpButton';
import UserRatesAdded from '../UserRatesAdded/UserRatesAdded';
import s from './AddedRatesBlock.module.scss';

export default function AddedRatesBlock() {
  return (
    <div className={setClass([['cm-outer-block'], [s.wrapper]])}>
      <div className="cm-outer-block-header">
        <h2>Сохраненные курсы</h2>
        <HelpButton
          text={[
            `Здесь показаны сохраненные пользовательские курсы. Расчет обменного
          курса соответствующих валют происходит с их использованием.`,
            `Вы можете удалить любой пользовательский курс нажав на кнопку справа в строке курса.`,
          ]}
        />
      </div>
      <UserRatesAdded />
    </div>
  );
}
