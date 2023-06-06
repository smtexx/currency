import { useContext } from 'react';
import { ConverterContext } from '../../app/Converter/controller/context';
import CustomDialog from '../CustomDialog/CustomDialog';
import s from './Tip.module.scss';

export default function Tip() {
  const { state, dispatch } = useContext(ConverterContext);
  const open = state.tip !== null;

  return (
    <CustomDialog
      title="Подсказка"
      open={open}
      controls={
        <button
          className="cm-text-button"
          type="button"
          onClick={() =>
            dispatch({ type: 'HIDE_TIP', payload: null })
          }
        >
          Понятно
        </button>
      }
    >
      <div className={s.message}>
        {state.tip?.map((part, idx) => (
          <p key={idx}>{part}</p>
        ))}
      </div>
    </CustomDialog>
  );
}
