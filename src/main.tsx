import './index.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './app/store';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Could not find container');
}

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
