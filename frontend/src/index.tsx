import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './app/App';
// import createTransaction from './entities/Transaction/api/createTransaction';
// import { getToken } from './shared/utils/utils';

// createTransaction(
//   {
//     category: 'Transporation',
//     description: 'бензин',
//     amount: 3000,
//     paymentMode: 'cash',
//     transactionType: 'income',
//     date: '2022-09-04T21:00:00.000Z',
//     time: '00:00',
//   },
//   getToken() as string,
// ).then((res) => console.log(res));

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
