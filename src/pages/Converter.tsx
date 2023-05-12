import AddedRatesBlock from '../components/AddedRatesBlock/AddedRatesBlock';
import ExchangeBlock from '../components/ExchangeBlock/ExchangeBlock';
import Updated from '../components/Updated/Updated';
import UserRatesBlock from '../components/UserRatesBlock/UserRatesBlock';

export default function Converter() {
  return (
    <>
      <div className="cm-hide-on-tablet-m">
        <Updated />
      </div>
      <ExchangeBlock />
      <UserRatesBlock />
      <AddedRatesBlock />
    </>
  );
}
