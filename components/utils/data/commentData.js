import { clientCredentials } from '../../../utils/client';

const endpoint = clientCredentials.databaseURL;

const getComments = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteComment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${id}`, {
    method: 'DElETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getSingleComment, getComments, deleteComment };
