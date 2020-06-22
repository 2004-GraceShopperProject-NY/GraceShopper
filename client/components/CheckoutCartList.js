import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import CheckoutCartItem from './CheckoutCartItem';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {checkOutCart} from '../store/checkoutCart';

class CheckoutCartList extends Component {
  constructor() {
    super();
    this.findProduct = this.findProduct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  findProduct(id) {
    let product = this.props.products.find(item => {
      return item.id === parseInt(id, 10);
    });
    return product;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.checkoutCart();
  }

  getTotalPrice() {
    if (this.props.products.length === 0) {
      return 0;
    }
    return Object.keys(this.props.cart).reduce((acc, id) => {
      const product = this.findProduct(id);
      return acc + product.price * this.props.cart[id];
    }, 0);
  }

  render() {
    const {cart, products} = this.props;
    const cartItems = products.length ? cart : {};
    return (
      <div>
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Your cart</span>
          <span className="badge badge-secondary badge-pill">
            {Object.values(cart).reduce((acc, item) => {
              return acc + item;
            }, 0)}
          </span>
        </h4>
        <ul className="list-group mb-3 sticky-top">
          {Object.keys(cartItems).map(id => (
            <CheckoutCartItem
              key={id}
              product={this.findProduct(id)}
              quantity={cart[id]}
            />
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <span>Total:</span>
            <strong>{priceToDollar(this.getTotalPrice())}</strong>
          </li>
        </ul>
        <div className="button-confirmation-row">
          <Button
            className="button-confirmation"
            type="submit"
            onClick={this.handleSubmit}
          >
            Confirm Order
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    products: state.products.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkoutCart: () => dispatch(checkOutCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutCartList);
