import { BsCloudDownload } from 'react-icons/bs';
import s from './Loader.module.scss';
import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = '';
    };
  });

  return (
    <div className={s.wrapper}>
      <div className={s.loader}>
        <BsCloudDownload />
      </div>
      <p className={s.text}>Загружаем приложение...</p>
    </div>
  );
}
