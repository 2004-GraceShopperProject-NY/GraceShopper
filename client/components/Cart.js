import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addToCartThunk, getCartThunk} from '../store/cart';
import SingleCartItem from './SingleCartItem';
import {fetchProducts} from '../store/products';
import {RiShoppingCartLine} from 'react-icons/ri';
import {Button} from 'reactstrap';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.findProduct = this.findProduct.bind(this);
  }

  componentWillMount() {
    this.props.allProducts();
    this.props.getCartThunk();
  }

  findProduct(id) {
    let product = this.props.products.find(product => {
      return product.id === parseInt(id);
    });
    return product;
  }

  render() {
    if (this.props.products.length)
      return (
        <div className="cart">
          <h1 className="title-cart">
            {' '}
            Your <RiShoppingCartLine size={32} color="black" />{' '}
          </h1>
          {Object.keys(this.props.cart).map(id => (
            <SingleCartItem
              key={id}
              product={this.findProduct(id)}
              quantity={this.props.cart[id]}
            />
          ))}
          <Button size="lg" className="button-checkout">
            Checkout
          </Button>
        </div>
      );
    else
      return (
        <div>
          <h1>
            {' '}
            <RiShoppingCartLine size={20} color="black" /> is empty{' '}
          </h1>
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
    addToCartThunk: () => dispatch(addToCartThunk()),
    getCartThunk: () => dispatch(getCartThunk()),
    allProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
