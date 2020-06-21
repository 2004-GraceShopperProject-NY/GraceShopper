import React, {Component} from 'react';
import {priceToDollar} from '../utilities/convertPriceToDollars';

class CheckoutCartItem extends Component {
  render() {
    const {product, quantity} = this.props;
    const {name, price} = product;
    return (
      <div>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <span className="text-muted">{quantity}</span>
          <span className="text-muted">{name}</span>
          <span className="text-muted">{priceToDollar(price * quantity)}</span>
        </li>
      </div>
    );
  }
}

export default CheckoutCartItem;
