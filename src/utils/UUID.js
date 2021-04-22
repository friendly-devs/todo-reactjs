import { v4 as generator } from 'uuid';

const UUID = {
  generateId() {
    return generator();
  },
};

export default UUID;
