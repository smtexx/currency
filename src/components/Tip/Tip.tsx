import s from './Tip.module.scss';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { setClass } from '../../lib/helpers';

export default function Tip() {
  return (
    <div className={s.wrapper}>
      <button
        className={setClass([
          [s.close],
          ['cm-icon-button'],
          ['cm-link-hover'],
        ])}
        aria-label="закрыть"
        title="Закрыть"
      >
        <IoCloseCircleOutline />
      </button>
      <div className={s.icon}>
        <RiQuestionnaireFill />
      </div>
      <div className={s.text}>
        <p>
          В этом блоке вы можете добавить свой курс валют. Например,
          вам нужно поменять деньги в обменнике. Вы добавляете здесь
          курс конкретного обменника, и конвертация валют теперь
          осуществляется с учетом этого курса (как прямая, так и
          обратная).
        </p>
        <p>
          Вы можете добавить сколько угодно пользовательских курсов
          валют. При добавлении пользовательского курса происходит
          пересчет курса валют, если этот курс задействован в
          соответствующих блоках. ОСОБЕННОСТЬ: НЕ ИСПОЛЬЗУЙТЕ КУРСЫ
          ТИПА
        </p>
      </div>
    </div>
  );
}
