import { ReactNode } from 'react';
import Dialog from '../Dialog/Dialog';
import s from './CustomDialog.module.scss';

interface I_Props {
  title: string;
  open: boolean;
  children: ReactNode;
  controls: ReactNode;
}

export default function CustomDialog({
  title,
  open,
  children,
  controls,
}: I_Props) {
  return (
    <Dialog open={open}>
      <div className={s.wrapper}>
        <header className={s.header}>
          <h2>{title}</h2>
        </header>
        <div className={s.content}>{children}</div>
        <div className={s.controls}>{controls}</div>
      </div>
    </Dialog>
  );
}
