import axios from 'axios';
const { useQuery } = require('react-query');
const url =
  'https://bikeindex.org:443/api/v3/search?page=1&per_page=50&location=IP&distance=10&stolenness=stolen';
const baseUrl = 'https://bikeindex.org:443/api/v3/';

export default function getBikes() {
  return useQuery(
    `bikes`,
    async () => {
      const data = await axios.get(url);
      return data.data.bikes;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
}
