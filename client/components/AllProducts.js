import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts, deleteProductThunk} from '../store/products';
import {Link} from 'react-router-dom';
import {RiShoppingCartLine} from 'react-icons/ri';
import {Button} from 'reactstrap';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {addToCartThunk, addToDb} from '../store/cart';

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
    if (this.props.isLoggedIn) {
      this.props.addToDb(product, this.state.quantity);
    }
    this.props.addToCartThunk(product, this.state.quantity);
  };

  render() {
    const {products, deleteProduct, userLoggedIn} = this.props;

    return (
      <div>
        <h2 className="title-all-products">What are you looking for today?</h2>
        {userLoggedIn.role === 'admin' ? (
          <div className="add-new-product-center">
            <Button href="./add_new_product" className="button-add-to-cart-1">
              Add new product
            </Button>
          </div>
        ) : (
          ''
        )}
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

              {userLoggedIn.role === 'admin' ? (
                <Button
                  className="delete"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete Product
                </Button>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user,
    products: state.products.allProducts,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allProducts: () => dispatch(fetchProducts()),
    addToCartThunk: (product, quantity) =>
      dispatch(addToCartThunk(product, quantity)),
    deleteProduct: id => dispatch(deleteProductThunk(id)),
    addToDb: (product, quantity) => dispatch(addToDb(product, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
