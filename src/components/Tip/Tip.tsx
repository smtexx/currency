import { useContext } from 'react';
import { setClass } from '../../lib/helpers';
import { ConverterContext } from '../../app/Converter/controller/context';
import Dialog from '../Dialog/Dialog';
import s from './Tip.module.scss';

export default function Tip() {
  const { state, dispatch } = useContext(ConverterContext);
  const open = state.tip !== null;

  return (
    <Dialog open={open}>
      <header className={s.header}>
        <h2 className={s.title}>Подсказка</h2>
      </header>
      <div className={s.message}>
        {state.tip?.map((part, idx) => (
          <p key={idx}>{part}</p>
        ))}
      </div>
      <div className={s.controls}>
        <button
          className={setClass([[s.close], ['cm-input']])}
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
