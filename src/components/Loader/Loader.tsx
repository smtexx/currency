import { HashLoader } from 'react-spinners';
import s from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={s.wrapper}>
      <div className={s.loader}>
        <HashLoader color="#6b8068" />
      </div>
      <p className={s.text}>Загрузка...</p>
    </div>
  );
}
