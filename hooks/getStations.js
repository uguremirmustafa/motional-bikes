import axios from 'axios';
const { useQuery } = require('react-query');

const apiKey = '135ba1a7a681c2fd5ed0d331b6d5625d9484a03d';
export default function getStations(contract_name) {
  return useQuery(
    `stations`,
    async () => {
      const url = `https://api.jcdecaux.com/vls/v1/stations?contract=${contract_name}&apiKey=${apiKey}`;
      const data = await axios.get(url);
      return data.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
}
