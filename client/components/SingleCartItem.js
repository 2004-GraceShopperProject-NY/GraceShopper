import React, {Component} from 'react';
import {connect} from 'react-redux';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {FiDelete} from 'react-icons/fi';
import {
  updateQuantityThunk,
  removeFromCart,
  removeFromDb,
  addToDb,
  updateDbQuantity
} from '../store/cart';

export class SingleCartItem extends Component {
  constructor() {
    super();
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleQuantityChange = (event, productId) => {
    let quantity = parseInt(event.target.value, 10);
    quantity = quantity ? quantity : 0;
    if (this.props.isLoggedIn) {
      this.props.updateDbQuantity(this.props.product, quantity);
    }
    if (quantity <= 0) {
      if (this.props.isLoggedIn) {
        this.props.removeFromDb(productId);
      }
      this.props.removeFromCart(productId);
    } else if (quantity <= this.props.product.quantity) {
      this.props.updateQuantity(productId, quantity);
    } else {
      alert(
        'Sorry, we do not have enough of this product. Try adding less to your cart.'
      );
    }
  };

  render() {
    const {product, quantity} = this.props;
    const {id, name, imageUrl, price} = product;
    return (
      <div className="single-view-main">
        <div className="single-view-item">
          <FiDelete
            onClick={() => {
              if (this.props.isLoggedIn) {
                this.props.removeFromDb(id);
              }
              this.props.removeFromCart(id);
            }}
            size={40}
          />
          <img src={imageUrl} height="200px" />
          <h2 className="title-single-product">{name}</h2>
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
          <div className="item-total-price">
            {priceToDollar(price * quantity)}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateQuantity: (productId, quantity) =>
      dispatch(updateQuantityThunk(productId, quantity)),
    removeFromCart: productId => dispatch(removeFromCart(productId)),
    removeFromDb: id => dispatch(removeFromDb(id)),
    addToDb: (product, quantity) => dispatch(addToDb(product, quantity)),
    updateDbQuantity: (product, quantity) =>
      dispatch(updateDbQuantity(product, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCartItem);
