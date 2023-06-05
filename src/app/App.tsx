import { useReducer, useEffect } from 'react';
import Layout from '../layout/Layout';
import Converter from './Converter/view/Converter';
import { reducer } from './Converter/controller/reducer';
import { initialState } from './Converter/controller/initialState';
import { ConverterContext } from './Converter/controller/context';
import './styles/index.scss';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Catch beforeinstallprompt event
  useEffect(() => {
    if ('cusomInstallPromptEvent' in window) {
      dispatch({
        type: 'SAVE_INSTALL_PROMPT_EVENT',
        payload: window.cusomInstallPromptEvent as Event,
      });
    }
  }, []);

  return (
    <ConverterContext.Provider value={{ state, dispatch }}>
      <Layout>
        <Converter />
      </Layout>
    </ConverterContext.Provider>
  );
}
