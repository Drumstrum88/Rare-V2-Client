import { clientCredentials } from '../../../utils/client';

const getSingleUser = async (id) => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
    return 'getSingleUserFailed';
  }
};

const checkUser = (uid) => fetch(`${clientCredentials.databaseURL}/checkuser`, {
  method: 'POST',
  body: JSON.stringify({ uid }),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Fetch Error:', error);
    throw error;
  });

// eslint-disable-next-line import/prefer-default-export
export { getSingleUser, checkUser };
