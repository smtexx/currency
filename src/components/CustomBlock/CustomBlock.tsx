import HelpButton from '../HelpButton/HelpButton';
import s from './CustomBlock.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function CustomBlock({ children, title }: Props) {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h2 className="cm-block-title">{title}</h2>
        <HelpButton />
      </div>
      {children}
    </div>
  );
}
