import { useContext, useEffect } from 'react';
import AddedRatesBlock from '../../../components/AddedRatesBlock/AddedRatesBlock';
import ExchangeBlock from '../../../components/ExchangeBlock/ExchangeBlock';
import Updated from '../../../components/Updated/Updated';
import UserRatesBlock from '../../../components/UserRatesBlock/UserRatesBlock';
import { ConverterContext } from '../controller/context';
import { fetchRates } from '../api/fetchRates';
import { ConverterStatus } from '../../../types';
import { UpdateRatesActionPayload } from '../controller/reducer';

export default function Converter() {
  const { dispatch } = useContext(ConverterContext);

  useEffect(() => {
    (async function () {
      const data = await fetchRates();
      let payload: UpdateRatesActionPayload;

      if ('error' in data) {
        payload = {
          status: ConverterStatus.ERROR,
        };
      } else {
        payload = {
          status: ConverterStatus.READY,
          ...data,
        };
      }

      dispatch({ type: 'UPDATE_STATUS', payload });
    })();
  }, [dispatch]);

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
