import {
  RiExchangeDollarFill,
  RiAlertLine,
  RiLoader4Line,
} from 'react-icons/ri';
import s from './Updated.module.scss';
import { useContext } from 'react';
import { ConverterContext } from '../../app/Converter/controller/context';
import { ConverterStatus } from '../../types';
import { setClass } from '../../lib/helpers';
import Settings from '../Settings/Settings';

type I_RenderData = {
  [key in ConverterStatus]: {
    icon: JSX.Element;
    text: string;
  };
};

export default function Updated() {
  const { state } = useContext(ConverterContext);

  const renderData: I_RenderData = {
    READY: {
      icon: <RiExchangeDollarFill />,
      text: `Обновлено: ${
        state.updated !== null
          ? new Date(state.updated)
              .toLocaleString('ru-RU', {
                month: '2-digit',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
              .replace(',', ' -')
          : ''
      }`,
    },
    ERROR: {
      icon: <RiAlertLine />,
      text: 'Ошибка обновления',
    },
    UPDATING: {
      icon: <RiLoader4Line />,
      text: 'Обновление курсов',
    },
  };

  return (
    <div
      className={setClass([
        [s.wrapper],
        [s.error, state.status === ConverterStatus.ERROR],
      ])}
    >
      <p className={s.message}>
        <span
          className={setClass([
            [s.icon],
            [s.rotate, state.status === ConverterStatus.UPDATING],
          ])}
        >
          {renderData[state.status].icon}
        </span>
        <span className={s.text}>
          {renderData[state.status].text}
        </span>
      </p>
      <Settings />
    </div>
  );
}
