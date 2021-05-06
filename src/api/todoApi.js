import client from './client';

const api = {
  getTodoList() {
    return client.get('/todos');
  },
  deleteTodo(id) {
    return client.delete(`/todos/${id}`);
  },
};

export default api;
