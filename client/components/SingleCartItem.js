import React, {Component} from 'react';
import {connect} from 'react-redux';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {RiShoppingCartLine} from 'react-icons/ri';
import {Col, Button} from 'reactstrap';
import {updateQuantityThunk} from '../store/cart';

class SingleCartItem extends Component {
  constructor() {
    super();
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleQuantityChange = (event, productId) => {
    console.log('id from handle chnage', productId);
    console.log('value from handle change', event.target.value);
    const quantity = parseInt(event.target.value, 10);
    this.props.updateQuantity(productId, quantity);
  };

  render() {
    const {product, quantity} = this.props;
    const {id} = product;
    console.log(product);
    return (
      <div>
        <h2 className="title-single-product">{product.name}</h2>
        <div className="single-view-item">
          <Col>
            <img src={product.imageUrl} height="200px" />
          </Col>
          <Col>
            <div className="item-total-price">
              Total Price: {priceToDollar(product.price * quantity)}
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
            <div>Item Price: {priceToDollar(product.price)}</div>
            <div>Description:</div>
            <div>{product.description}</div>

            <Button
              className="button-remove-from-cart"
              onClick={() => this.addToCart()}
            >
              Remove from <RiShoppingCartLine size={20} color="black" />
            </Button>
          </Col>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     cart: state.products.cart,
//   };
// };

// const mapStateToProps = (state) => {
//   return {
//     cart: state.cart,
//     products: state.products.allProducts,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    updateQuantity: (productId, quantity) =>
      dispatch(updateQuantityThunk(productId, quantity))
  };
};

export default connect(null, mapDispatchToProps)(SingleCartItem);
