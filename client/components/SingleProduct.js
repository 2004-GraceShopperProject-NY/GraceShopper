import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSingleProduct} from '../store/products';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }

  render() {
    const {product} = this.props;

    return (
      <div>
        <h2>Single Product View:</h2>
        <div>
          <img src={product.imageUrl} height="200px" />
        </div>
        <p>{product.name}</p>
        <p>Price: {(product.price / 100).toFixed(2)}</p>
        <p>Description: {product.description}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.selectedProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(getSingleProduct(productId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
