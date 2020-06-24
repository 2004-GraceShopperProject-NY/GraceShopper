import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

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

const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName
  };
};

export default connect(mapState)(UserHome);
