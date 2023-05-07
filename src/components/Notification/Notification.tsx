import Loader from '../Loader/Loader';
import Tip from '../Tip/Tip';
import s from './Notification.module.scss';

export default function Notification() {
  return (
    <div className={s.wrapper}>
      <Tip />
    </div>
  );
}
