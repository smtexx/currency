import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import s from './Checkbox.module.scss';

interface I_Props {
  labelID: string;
  checked: boolean;
  onChange: () => void;
}

export default function Checkbox({
  checked,
  labelID,
  onChange,
}: I_Props) {
  return (
    <span
      className={s.wrapper}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      aria-labelledby={labelID}
      onClick={onChange}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          onChange();
        }
      }}
    >
      {checked ? (
        <MdOutlineCheckBox />
      ) : (
        <MdOutlineCheckBoxOutlineBlank />
      )}
    </span>
  );
}
