import { clientCredentials } from '../../../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCommentsForPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments?post_id=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${id}.json`, {
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
  fetch(`${endpoint}/comments/${id}.json`, {
    method: 'DElETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${payload.id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
export {
  getSingleComment, getCommentsForPost, deleteComment, updateComment, createComment,
};
