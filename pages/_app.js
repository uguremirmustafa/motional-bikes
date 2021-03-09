import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/Layout';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
