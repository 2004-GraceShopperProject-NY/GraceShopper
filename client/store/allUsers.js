import Axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';

const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  };
};

export const gotAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/admin');
      dispatch(getAllUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function allUsersReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return [...action.users];
    default:
      return state;
  }
}
