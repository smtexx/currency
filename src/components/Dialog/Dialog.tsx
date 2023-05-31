import { useRef, useEffect } from 'react';
import s from './Dialog.module.scss';

interface I_Props {
  open: boolean;
  children: React.ReactNode;
}

export default function Dialog({ open, children }: I_Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      {children}
    </dialog>
  );
}
