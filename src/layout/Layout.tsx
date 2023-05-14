import Tip from '../components/Tip/Tip';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import s from './Layout.module.scss';

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
      <Tip
        title="Подсказка"
        text={[
          `А здесь будет очень интересная подсказка о пользовании интерфейсом`,
          `Еще один параграф очень интересного текста`,
        ]}
        open={false}
      />
    </>
  );
}
