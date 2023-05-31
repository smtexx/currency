import { useContext } from 'react';
import { ConverterContext } from '../../app/Converter/controller/context';
import Dialog from '../Dialog/Dialog';
import s from './Tip.module.scss';

export default function Tip() {
  const { state, dispatch } = useContext(ConverterContext);
  const open = state.tip !== null;

  return (
    <Dialog open={open}>
      <header className="cm-dialog-header">
        <h2 className={s.title}>Подсказка</h2>
      </header>
      <div className={s.message}>
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
