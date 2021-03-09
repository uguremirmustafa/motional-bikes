import Head from 'next/head';
// import BikePreview from '../components/BikeCard/BikePreview';
import getBeers from '../hooks/getBikes';
import dynamic from 'next/dynamic';
import { AnimateSharedLayout } from 'framer-motion';
import Loading from '../components/Loading/Loading';
// const Puppy =
const BikePreview = dynamic(() => import('../components/BikeCard/BikePreview'), {
  loading: () => <Loading />,
});
export default function Home() {
  const { error, isLoading, data } = getBeers();
  const bikes = data?.filter((i) => i.thumb);

  error && <div>sth went wrong</div>;
  isLoading && <Loading />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Motional Bikes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimateSharedLayout>
        <div className="grid grid-flow-row grid-cols-1 gap-1">
          {bikes?.map((i) => (
            <BikePreview bike={i} key={i.id} />
          ))}
        </div>
      </AnimateSharedLayout>
    </div>
  );
}
