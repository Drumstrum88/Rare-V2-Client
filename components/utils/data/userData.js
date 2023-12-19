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

// eslint-disable-next-line import/prefer-default-export
export { getSingleUser };
