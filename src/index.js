import { createRoot } from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';
import config from './config';

// style + assets
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    {/* Wrap App component with ChakraProvider */}
    <ChakraProvider>
      <BrowserRouter basename={config.basename}>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);

serviceWorker.unregister();
