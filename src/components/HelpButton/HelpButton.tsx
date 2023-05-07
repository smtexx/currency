import { setClass } from '../../lib/helpers';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import s from './HelpButton.module.scss';

export default function HelpButton() {
  return (
    <button className={setClass([['cm-icon-button'], [s.button]])}>
      <AiOutlineQuestionCircle />
    </button>
  );
}
