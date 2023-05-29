import { useEffect, useRef, useContext } from 'react';
import s from './Tip.module.scss';
import { setClass } from '../../lib/helpers';
import { ConverterContext } from '../../app/Converter/controller/context';

export default function Tip() {
  const { state, dispatch } = useContext(ConverterContext);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = state.tip !== null;

  useEffect(() => {
    if (dialogRef.current !== null) {
      const dialog = dialogRef.current;

      if (!dialog.open && open) {
        dialog.showModal();
        const bodyWidth = document.body.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.width = `${bodyWidth}px`;
      }
      if (dialog.open && !open) {
        dialog.close();
        document.body.style.overflowY = '';
        document.body.style.width = '';
      }
    }
  }, [open]);

  return (
    <dialog className={s.wrapper} ref={dialogRef}>
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
    </dialog>
  );
}
