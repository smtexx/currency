import { useContext } from 'react';
import { ConverterContext } from '../../app/Converter/controller/context';
import Dialog from '../Dialog/Dialog';
import s from './Tip.module.scss';
import { setClass } from '../../lib/helpers';

export default function Tip() {
  const { state, dispatch } = useContext(ConverterContext);
  const open = state.tip !== null;

  return (
    <Dialog open={open}>
      <header className="cm-dialog-header">
        <h2>Подсказка</h2>
      </header>
      <div className={setClass([['cm-dialog-content'], [s.message]])}>
        {state.tip?.map((part, idx) => (
          <p key={idx}>{part}</p>
        ))}
      </div>
      <div className="cm-dialog-controls">
        <button
          className="cm-text-button"
          type="button"
          onClick={() =>
            dispatch({ type: 'HIDE_TIP', payload: null })
          }
        >
          Понятно
        </button>
      </div>
    </Dialog>
  );
}
