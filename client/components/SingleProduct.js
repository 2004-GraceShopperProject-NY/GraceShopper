import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSingleProduct, updateProductAdminThunk} from '../store/products';
import {Button} from 'reactstrap';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {RiShoppingCartLine} from 'react-icons/ri';
import {addToCartThunk, addToDb} from '../store/cart';

export class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      adminUpdateQuantity: 0
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }

  handleInputChange = event =>
    this.setState({[event.target.name]: event.target.value});

  addToCart = () => {
    if (this.props.isLoggedIn) {
      this.props.addToDb(this.props.product, this.state.quantity);
    }
    this.props.addToCartThunk(this.props.product, this.state.quantity);
    this.setState({
      quantity: 1
    });
  };

  render() {
    const {product} = this.props;

    return (
      <div className="single-view-main">
        <h2 className="title-single-product-view">{product.name}</h2>
        <div className="single-view-item-page">
          <img src={product.imageUrl} height="200px" />
          <div className="price-all-products">
            {priceToDollar(product.price)} x
          </div>
          <input
            type="number"
            value={this.state.quantity}
            name="quantity"
            onChange={this.handleInputChange}
            className="float-right"
            style={{width: '60px', marginRight: '10px', borderRadius: '3px'}}
          />
          <div>{product.description}</div>
          <Button
            className="button-add-to-cart"
            onClick={() => this.addToCart()}
          >
            Add to <RiShoppingCartLine size={20} color="black" />
          </Button>
        </div>
        {this.props.userLoggedIn.role === 'admin' ? (
          <div>
            <h2>Update this product:</h2>
            <input
              name="adminUpdateQuantity"
              min="0"
              placeholder="# of items in stock"
              type="number"
              value={this.state.adminUpdateQuantity}
              onChange={this.handleInputChange}
            />
            <Button
              onClick={() =>
                this.props.updateProduct(
                  product.id,
                  this.state.adminUpdateQuantity
                )
              }
              className="button-add-to-cart"
            >
              UPDATE
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user,
    product: state.products.selectedProduct,
    cart: state.cart,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(getSingleProduct(productId)),
    updateProduct: (productId, quantity) =>
      dispatch(updateProductAdminThunk(productId, quantity)),
    addToCartThunk: (product, quantity) =>
      dispatch(addToCartThunk(product, quantity)),
    addToDb: (product, quantity) => dispatch(addToDb(product, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
