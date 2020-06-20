import React, {Component} from 'react';
import {connect} from 'react-redux';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {RiShoppingCartLine} from 'react-icons/ri';
import {Col, Button} from 'reactstrap';
import {updateQuantityThunk, removeFromCart} from '../store/guestCart';

class SingleCartItem extends Component {
  constructor() {
    super();
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleQuantityChange = (event, productId) => {
    let quantity = parseInt(event.target.value, 10);
    quantity = quantity ? quantity : 0;
    if (quantity <= this.props.product.quantity) {
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
        <h2 className="title-single-product">{name}</h2>
        <div className="single-view-item">
          <Col>
            <img src={imageUrl} height="200px" />
          </Col>
          <Col>
            <div className="item-total-price">
              Total Price: {priceToDollar(price * quantity)}
            </div>
            <div>
              Quantity:{' '}
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
            <div>Item Price: {priceToDollar(price)}</div>
            <div>Description:</div>
            <div>{description}</div>

            <Button
              className="button-remove-from-cart"
              onClick={() => this.props.removeFromCart(id)}
            >
              Remove from <RiShoppingCartLine size={20} color="black" />
            </Button>
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
