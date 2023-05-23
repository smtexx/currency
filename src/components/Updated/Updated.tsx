import {
  RiExchangeDollarFill,
  RiAlertLine,
  RiLoader4Line,
} from 'react-icons/ri';
import s from './Updated.module.scss';
import HelpButton from '../HelpButton/HelpButton';
import { useContext } from 'react';
import { ConverterContext } from '../../app/Converter/controller/context';
import { ConverterStatus } from '../../types';
import { setClass } from '../../lib/helpers';

export default function Updated() {
  const { state } = useContext(ConverterContext);

  if (
    state.status === ConverterStatus.READY &&
    typeof state.updated === 'number'
  ) {
    const lastUpdate = new Date(state.updated);
    return (
      <p className={s.wrapper}>
        <span className={s.icon}>
          <RiExchangeDollarFill />
        </span>{' '}
        <span className={s.text}>
          Обновлено:{' '}
          {`${lastUpdate
            .toLocaleString('ru-RU', {
              month: '2-digit',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
            .replace(',', ' -')}`}
        </span>
        <span className={s.button}>
          <HelpButton
            text={[
              `Здесь показаны дата и время последнего обновления курсов валют. 
            Приложение использует бесплатный источник данных (API). Поэтому, данные обновляются
            только раз в сутки.`,
              `Платный источник курсов валют обновляется каждый час, но стоит денег :( 
            Если вы готовы проспонсировать это, свяжитесь с нами. Мы выступаем за бесплатное 
            свободно распространяемое ПО.`,
            ]}
          />
        </span>
      </p>
    );
  }

  if (state.status === ConverterStatus.ERROR) {
    return (
      <p className={setClass([[s.wrapper], [s.error]])}>
        <span className={s.icon}>
          <RiAlertLine />
        </span>{' '}
        <span className={s.text}>Ошибка обновления</span>
        <span className={s.button}>
          <HelpButton
            text={[
              `По каким то неведомым причинам, не удалось обновить котировки курсов валют.
              Нам искренне жаль. Иногда такое случается, мы попробуем разобраться в причинах.`,
              `Но вы все же можете использовать пользовательские курсы валют для конвертации. 
              Добавьте их в разделе "Пользовательские курсы"`,
            ]}
          />
        </span>
      </p>
    );
  }

  if (state.status === ConverterStatus.UPDATING) {
    return (
      <p className={s.wrapper}>
        <span className={setClass([[s.icon], [s.rotate]])}>
          <RiLoader4Line />
        </span>{' '}
        <span className={s.text}>Обновление курсов</span>
        <span className={s.button}>
          <HelpButton
            text={[
              `Прямо сейчас происходит обновление курсов валют с сервера, 
            пожалуйста, подождите немного. Обычно это происходит довольно быстро, 
            но зависит от скорости вашего интернет соединения.`,
            ]}
          />
        </span>
      </p>
    );
  }

  return null;
}
