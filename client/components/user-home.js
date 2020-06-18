import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <button onClick={() => axios.post('/api/cart', {id: 1})} />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
