import { BsCloudDownload } from 'react-icons/bs';
import s from './Loader.module.scss';
import { useEffect, useState } from 'react';

export default function Loader() {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = '';
    };
  });

  // Hide loader if app is ready
  const [shown, setShown] = useState(true);
  function hideLoader() {
    setShown(false);
  }
  useEffect(() => {
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      return () => window.removeEventListener('load', hideLoader);
    }
  });

  return shown ? (
    <div className={s.wrapper}>
      <div className={s.loader}>
        <BsCloudDownload />
      </div>
      <p className={s.text}>Загружаем приложение...</p>
    </div>
  ) : null;
}
