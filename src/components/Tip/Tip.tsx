import { useEffect, useRef } from 'react';
import s from './Tip.module.scss';
import { setClass } from '../../lib/helpers';

interface Props {
  open: boolean;
  title: string;
  text: string[];
}

export default function Tip({ title, open, text }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current !== null) {
      const dialog = dialogRef.current;
      if (!dialog.open && open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
      if (dialog.open && !open) {
        dialog.close();
        document.body.style.overflow = '';
      }
    }
  }, [open, dialogRef]);

  return (
    <dialog className={s.wrapper} ref={dialogRef}>
      <header className={s.header}>
        <h2 className={s.title}>{title}</h2>
      </header>
      <div className={s.message}>
        {text.map((part, idx) => (
          <p key={idx}>{part}</p>
        ))}
      </div>
      <div className={s.controls}>
        <button
          className={setClass([[s.close], ['cm-input']])}
          type="button"
        >
          Понятно
        </button>
      </div>
    </dialog>
  );
}
