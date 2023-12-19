const postEndpoint = 'http://localhost:8088/posts';

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${postEndpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${postEndpoint}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPost = (postData) => new Promise((resolve, reject) => {
  fetch(`${postEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const updatePost = (id, currentPost) => new Promise((resolve, reject) => {
  fetch(`${postEndpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentPost),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    })
    .then(resolve)
    .catch(reject);
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${postEndpoint}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

export {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
