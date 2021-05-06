import axios from 'axios';
import queryString from 'query-string';

const config = {
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
};

const client = axios.create(config);

client.interceptors.response.use(async (response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, async (error) => {
  throw error;
});

export default client;
