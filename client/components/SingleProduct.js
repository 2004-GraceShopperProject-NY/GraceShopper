import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSingleProduct} from '../store/products';
import {Col, Button} from 'reactstrap';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {RiShoppingCartLine} from 'react-icons/ri';
import {addToCartThunk} from '../store/guestCart';
import {addToCartLoggedIn} from '../store/loggedInCart';

export class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
    console.log('loggedInCartItems', this.props.loggedInCart);
  }

  handleInputChange = event =>
    this.setState({[event.target.name]: event.target.value});

  addToCart = () => {
    this.props.isLoggedIn
      ? this.props.addToCartLoggedIn(this.props.product, this.state.quantity)
      : this.props.addToCartThunk(this.props.product, this.state.quantity);
    this.setState = {
      quantity: 1
    });
  };

  render() {
    const {product} = this.props;
    console.log('loggedInCartItems', this.props.loggedInCart);
    return (
      <div>
        <h2 className="title-single-product">{product.name}</h2>
        <div className="single-view-item">
          <Col>
            <img src={product.imageUrl} height="200px" />
          </Col>
          <Col>
            <div>Price: {priceToDollar(product.price)}</div>
            <div>Description:</div>
            <div>{product.description}</div>
            <div>Quantity</div>
            <input
              type="number"
              value={this.state.quantity}
              name="quantity"
              onChange={this.handleInputChange}
              className="float-right"
              style={{width: '60px', marginRight: '10px', borderRadius: '3px'}}
            />
            <Button
              className="button-add-to-cart"
              onClick={() => this.addToCart()}
            >
              Add to <RiShoppingCartLine size={20} color="black" />
            </Button>
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    product: state.products.selectedProduct,
    loggedInCart: state.loggedInCart,
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(getSingleProduct(productId)),
    addToCartThunk: (product, quantity) =>
      dispatch(addToCartThunk(product, quantity)),
    addToCartLoggedIn: (product, quantity) =>
      dispatch(addToCartLoggedIn(product, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
