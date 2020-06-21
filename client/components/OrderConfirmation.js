import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

const OrderConfirmation = props => {
  const {confirmationNum} = props.checkedOutInfo;

  return (
    <div className="confirmation-page-view">
      <h2 className="confirmation-home-page">
        Thank you for shopping with us! Your order has been placed!
      </h2>
      <h3 className="confirmation-home-page2">
        Confirmation #: {confirmationNum}
      </h3>
      <h4 className="confirmation-home-page2">
        May the odds be ever in your favor
      </h4>
      <div className="confirmation-page-row-button">
        <Button className="button-start-new-order" href="/" type="submit">
          Start New Order
        </Button>
      </div>
      <img
        className="confirmation-page-image-size"
        src="/confirmation-page.png"
        alt="ConfirmationPageImage"
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    checkedOutInfo: state.checkedOutInfo
  };
};

export default connect(mapStateToProps)(OrderConfirmation);
