import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const OrderConfirmation = props => {
  const {confirmationNum} = props.checkedOutInfo;

  return (
    <div>
      <h2>Thank you for shopping with us! Your order has been placed!</h2>
      <h3>Confirmation #: {confirmationNum}</h3>
      <h4>May the odds be ever in your favor</h4>

      <Link to="/home">
        <button type="submit">Start New Order</button>
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    checkedOutInfo: state.checkedOutInfo
  };
};

export default connect(mapStateToProps)(OrderConfirmation);
