import React, {Component} from 'react';
import {connect} from 'react-redux';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {FcAbout} from 'react-icons/fc';
import {FiDelete} from 'react-icons/fi';
import {Col, Button} from 'reactstrap';
import {updateQuantityThunk, removeFromCart} from '../store/guestCart';

export class SingleCartItem extends Component {
  constructor() {
    super();
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleQuantityChange = (event, productId) => {
    let quantity = parseInt(event.target.value, 10);
    quantity = quantity ? quantity : 0;
    if (quantity <= 0) {
      this.props.removeFromCart(productId);
    } else if (quantity <= this.props.product.quantity) {
      this.props.updateQuantity(productId, quantity);
    } else {
      alert('limit is reached');
    }
  };

  render() {
    const {product, quantity} = this.props;
    const {id, name, imageUrl, price, description} = product;
    return (
      <div>
        {/* <h2 className="title-single-product">{name}</h2> */}
        <div className="single-view-item">
          <Col sm={1} className="remove-icon">
            <FiDelete onClick={() => this.props.removeFromCart(id)} size={40} />
          </Col>
          <Col sm={5}>
            <img src={imageUrl} height="200px" />
          </Col>
          <Col sm={2} className="quantity-input">
            <h2 className="title-single-product">{name}</h2>
          </Col>
          <Col sm={2} className="quantity-input">
            <div>
              {' '}
              <input
                className="quantity"
                type="number"
                min="0"
                value={quantity}
                name="quantity"
                onChange={() => this.handleQuantityChange(event, id)}
                style={{
                  width: '60px',
                  marginRight: '10px',
                  borderRadius: '3px'
                }}
              />
            </div>
          </Col>
          <Col sm={2} className="quantity-input">
            <div className="item-total-price">
              {priceToDollar(price * quantity)}
            </div>
            {/* <div>Item Price: {priceToDollar(price)}</div> */}
            {/* <div>{description}</div> */}
          </Col>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuantity: (productId, quantity) =>
      dispatch(updateQuantityThunk(productId, quantity)),
    removeFromCart: productId => dispatch(removeFromCart(productId))
  };
};

export default connect(null, mapDispatchToProps)(SingleCartItem);
