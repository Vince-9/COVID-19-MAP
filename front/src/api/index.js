import axios from 'axios';

export function getCovidDataByDate(date) {
  return axios.get('/api/v1/getCovidDataByDate?date=2020-02-24').then(data => data.data);
}