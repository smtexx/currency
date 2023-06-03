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
        const padding =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = `${padding}px`;
      }
      if (dialog.open && !open) {
        dialog.close();
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';
      }
    }
  }, [open]);

  return (
    <dialog className={s.wrapper} ref={dialogRef}>
      {children}
    </dialog>
  );
}
