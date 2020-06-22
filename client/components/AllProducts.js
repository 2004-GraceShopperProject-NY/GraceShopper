import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom';
import {RiShoppingCartLine} from 'react-icons/ri';
import {Button} from 'reactstrap';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {addToCartThunk} from '../store/guestCart';

export class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.allProducts();
  }

  addToCart = product => {
    this.props.addToCartThunk(product, this.state.quantity);
  };

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
              <div className="title-name-all-products">{product.name}</div>
              <div className="price-all-products">
                {priceToDollar(product.price)}
              </div>
              <Button
                className="button-add-to-cart"
                onClick={() => this.addToCart(product)}
              >
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
    allProducts: () => dispatch(fetchProducts()),
    addToCartThunk: (product, quantity) =>
      dispatch(addToCartThunk(product, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
