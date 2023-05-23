import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useContext } from 'react';
import { ConverterContext } from '../../app/Converter/controller/context';

export default function HelpButton({ text }: { text: string[] }) {
  const { dispatch } = useContext(ConverterContext);
  return (
    <button
      className="cm-icon-button cm-link-hover"
      onClick={() =>
        dispatch({ type: 'SHOW_TIP', payload: { text } })
      }
    >
      <AiOutlineQuestionCircle />
    </button>
  );
}
