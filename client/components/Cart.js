import {Component} from 'react';
import {connect} from 'react-redux';
import React from 'react';
import {addToCartThunk} from '../store/cart';

class Cart extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     cart: [],
  //     total: 0
  //   }
  // }

  componentDidMount() {
    let cart = localStorage.getItem('cart');
    console.log(cart);
    if (!cart) return;

    // addToCartThunk(cart).then((products) => {
    //   let total = 0;
    //   for (let i = 0; i < products.length; i++) {
    //     total += products[i].price * products[i].qty;
    //   }
    //   this.getState({ cart, total });
    //   });
  }

  render() {
    return (
      <div>
        <h1> Your current cart: </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCartThunk: () => dispatch(addToCartThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
