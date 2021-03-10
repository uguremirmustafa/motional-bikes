import Head from 'next/head';
import Map from '../components/Map/Map';
import getStations from '../hooks/getStations';

export default function Home() {
  const { data, isLoading } = getStations('bruxelles');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Motional Bikes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <div>Loading...</div>}
      {data && <Map data={data} />}
    </div>
  );
}
