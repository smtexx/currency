import Tip from '../components/Tip/Tip';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import s from './Layout.module.scss';
import Loader from '../components/Loader/Loader';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className={s.wrapperOutside}>
        <div className={s.wrapperInside}>
          <Header />
          <main className={s.main}>{children}</main>
          <Footer />
        </div>
      </div>
      <Tip />
      <Loader />
    </>
  );
}
