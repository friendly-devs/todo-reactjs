import client from './client';

const api = {
  getTodoList() {
    return client.get('/todos');
  },
};

export default api;
