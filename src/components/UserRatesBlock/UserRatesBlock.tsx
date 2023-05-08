import CustomBlock from '../CustomBlock/CustomBlock';
import UserRateInput from '../UserRateInput/UserRateInput';
import UserRatesAdded from '../UserRatesAdded/UserRatesAdded';
import { BiChevronsDown } from 'react-icons/bi';

export default function UserRatesBlock() {
  return (
    <CustomBlock title="Пользовательские курсы">
      <UserRateInput />
      <div className="cm-direction-icon">
        <BiChevronsDown />
      </div>
      <UserRatesAdded />
    </CustomBlock>
  );
}
