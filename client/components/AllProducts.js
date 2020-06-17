import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom';

class AllProducts extends Component {
  componentDidMount() {
    this.props.allProducts();
  }

  render() {
    const {products} = this.props;

    return (
      <div>
        <h2>Viewing All Products: </h2>
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} height="200px" />
            </Link>
            <h6>{product.name}</h6>
            <h6>Price: ${(product.price / 100).toFixed(2)}</h6>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
