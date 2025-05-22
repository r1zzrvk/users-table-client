import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

const root = ReactDOM.createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
