import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';


/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props;

  return (
    <div className="home-page-view">
      <h3 className="welcome-user">Welcome, {firstName}</h3>
      <Button href="./products" className="button-view-products-user">
        Shop now
      </Button>
      <img
        className="home-page-image-size"
        src="/man-shopping-cart.svg"
        alt="ManShoppingCard"
      />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  // email: PropTypes.string
};
