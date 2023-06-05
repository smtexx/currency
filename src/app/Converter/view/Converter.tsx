import { useContext, useEffect } from 'react';
import AddedRatesBlock from '../../../components/AddedRatesBlock/AddedRatesBlock';
import ExchangeBlock from '../../../components/ExchangeBlock/ExchangeBlock';
import Updated from '../../../components/Updated/Updated';
import UserRatesBlock from '../../../components/UserRatesBlock/UserRatesBlock';
import { ConverterContext } from '../controller/context';
import { fetchRates } from '../api/fetchRates';
import { ConverterStatus } from '../../../types';
import { UpdateRatesActionPayload } from '../controller/reducer';
import { getConverterData } from '../../../components/Settings/getConverterData';

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

      // Get saved data and use it
      const savedData = getConverterData();
      if (savedData?.settings) {
        dispatch({
          type: 'SET_TRIPLE_CONVERSION',
          payload: savedData.settings.tripleСonversion,
        });
      }
      if (savedData !== null) {
        dispatch({ type: 'RESTORE_DATA', payload: savedData });
      }
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
