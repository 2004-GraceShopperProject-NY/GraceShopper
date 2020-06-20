import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckoutCartList from './CheckoutCartList';
import {checkOutCart} from '../store/checkoutCart';

class CheckoutPayment extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      address2: '',
      zip: '',
      nameOnCard: '',
      expiration: '',
      creditCardNumber: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.checkoutCart();
  }

  render() {
    const {cart} = this.props;

    return (
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout</h2>
          <p className="lead">Please review and confirm your order:</p>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <CheckoutCartList cart={cart} />
          </div>

          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    required=""
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {' '}
                    Valid first name is required.{' '}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    required=""
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {' '}
                    Valid last name is required.{' '}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <div className="invalid-feedback">
                  {' '}
                  Please enter a valid email address for shipping updates.{' '}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required=""
                  value={this.state.address}
                  onChange={this.handleInputChange}
                />
                <div className="invalid-feedback">
                  {' '}
                  Please enter your shipping address.{' '}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address2">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="address2"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                  value={this.state.address2}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select
                    className="custom-select d-block w-100"
                    id="country"
                    name="country"
                    required=""
                  >
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    {' '}
                    Please select a valid country.{' '}
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    className="custom-select d-block w-100"
                    id="state"
                    name="state"
                    required=""
                  >
                    <option>Choose...</option>
                    <option>New York</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    {' '}
                    Please provide a valid state.{' '}
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    name="zip"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required=""
                    value={this.state.zip}
                    onChange={this.handleInputChange}
                  />
                  <div className="invalid-feedback"> Zip code required. </div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    name="nameOnCard"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required=""
                    value={this.state.nameOnCard}
                    onChange={this.handleInputChange}
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    {' '}
                    Name on card is required{' '}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    name="creditCardNumber"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required=""
                    value={this.state.creditCardNumber}
                    onChange={this.handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {' '}
                    Credit card number is required{' '}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    name="expiration"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                    value={this.state.expiration}
                    onChange={this.handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {' '}
                    Expiration date required{' '}
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-cvv">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                    value={this.state.cvv}
                    onChange={this.handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {' '}
                    Security code required{' '}
                  </div>
                </div>
              </div>
              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                onClick={this.handleSubmit}
              >
                Confirm Order
              </button>

              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkoutCart: () => dispatch(checkOutCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPayment);
