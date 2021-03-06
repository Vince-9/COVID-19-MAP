import axios from 'axios';

export function getCovidDataByDate(date) {
  return axios.get(`/api/v1/getCovidDataByDate?date=${date}`).then(data => data.data);
}

export function getLineChartData() {
  return axios.get(`/api/v1/getLineChartData`).then(data => data.data);
}

export function reqLogin(username, password) {
  return axios.post(`/api/v1/login`, { username, password }).then(data => data.data);
}