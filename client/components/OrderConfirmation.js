import React from 'react';
import {Link} from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div>
      <h2>Thank you for shopping with us! Your order has been placed!</h2>
      <h4>May the odds be ever in your favor</h4>
      <Link to="/home">
        <button type="submit">Start New Order</button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
