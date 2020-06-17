import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom';
import {RiShoppingCartLine} from 'react-icons/ri';
import {Button} from 'reactstrap';

class AllProducts extends Component {
  componentDidMount() {
    this.props.allProducts();
  }

  render() {
    const {products} = this.props;

    return (
      <div>
        <h2 className="title-all-products">What are you looking for today?</h2>
        <div className="all-products">
          {products.map(product => (
            <div className="single-in-all-products" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} height="200px" />
              </Link>
              <h6>{product.name}</h6>
              <h6>Price: ${(product.price / 100).toFixed(2)}</h6>
              <Button className="button-add-to-cart">
                Add to <RiShoppingCartLine size={20} color="black" />
              </Button>
            </div>
          ))}
        </div>
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
