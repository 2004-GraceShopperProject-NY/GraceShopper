import {Component} from 'react';
import {connect} from 'react-redux';
import React from 'react';

export default class Cart extends Component {
  render() {
    return (
      <div>
        <h1> Your current cart: </h1>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     cart: state.cart.cart
//   }
// }

// export default connect(mapStateToProps)(Cart)
