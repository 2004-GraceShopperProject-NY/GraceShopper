import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCartThunk} from '../store/guestCart';
import SingleCartItem from './SingleCartItem';
import {fetchProducts} from '../store/products';
import {RiShoppingCartLine} from 'react-icons/ri';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class Cart extends Component {
  constructor() {
    super();
    this.findProduct = this.findProduct.bind(this);
  }

  componentDidMount() {
    this.props.allProducts();
    this.props.getCartThunk();
  }

  findProduct(id) {
    let product = this.props.products.find(item => {
      return item.id === parseInt(id, 10);
    });
    return product;
  }

  render() {
    const {cart, products} = this.props;
    return (
      <div>
        {JSON.stringify(cart) === '{}' || !products.length ? (
          <div>
            <h1 className="title-cart">
              Your <RiShoppingCartLine size={20} color="black" /> is empty.
            </h1>
          </div>
        ) : (
          <div className="cart">
            <h1 className="title-cart">
              Your <RiShoppingCartLine size={32} color="black" />
            </h1>
            {Object.keys(cart).map(id => (
              <SingleCartItem
                key={id}
                product={this.findProduct(id)}
                quantity={cart[id]}
              />
            ))}
            <Link to="/checkout">
              <Button size="lg" className="button-checkout">
                Checkout
              </Button>
            </Link>
          </div>
        )}
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
    getCartThunk: () => dispatch(getCartThunk()),
    allProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);