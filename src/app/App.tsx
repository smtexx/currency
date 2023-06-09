import { useReducer } from 'react';
import Layout from '../layout/Layout';
import Converter from './Converter/view/Converter';
import { reducer } from './Converter/controller/reducer';
import { initialState } from './Converter/controller/initialState';
import { ConverterContext } from './Converter/controller/context';
import './styles/index.scss';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ConverterContext.Provider value={{ state, dispatch }}>
      <Layout>
        <Converter />
      </Layout>
    </ConverterContext.Provider>
  );
}
