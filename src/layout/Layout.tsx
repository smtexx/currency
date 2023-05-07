import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Notification from '../components/Notification/Notification';
import s from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className={s.wrapperOutside}>
      <div className={s.wrapperInside}>
        <Header />
        <main className={s.main}>{children}</main>
        <Footer />
        {/* <Notification /> */}
      </div>
    </div>
  );
}
