import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSingleProduct} from '../store/products';
import {Container, Col, Row, Button} from 'reactstrap';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {RiShoppingCartLine} from 'react-icons/ri';
import {addToCartThunk} from '../store/cart';

class SingleProduct extends Component {
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
  }

  handleInputChange = event =>
    this.setState({[event.target.name]: event.target.value});

  addToCart = () => {
    console.log('we are in addToCart', this.props.product);
    let cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : {};
    let productId = this.props.product.id;
    cart[productId] = cart[productId] ? cart[productId] : 0;
    let qty = parseInt(cart[productId]) + parseInt(this.state.quantity);
    if (this.props.product.available_quantity < qty) {
      cart[productId] = this.props.product.available_quantity;
    } else {
      cart[productId] = qty;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.props.addToCartThunk(this.props.product);
    console.log('local Storage', localStorage);
    console.log('state cart', this.props.cart);
  };

  render() {
    const {product} = this.props;
    console.log(this.props);
    return (
      <div>
        <h2 className="title-single-product">{product.name}</h2>
        <div className="single-view-item">
          <Col>
            <img src={product.imageUrl} height="200px" />
          </Col>
          <Col>
            <div>Price: {priceToDollar(product.price)}</div>
            <div>Quantity</div>
            <div>Description:</div>
            <div>{product.description}</div>
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
    product: state.products.selectedProduct,
    cart: state.products.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(getSingleProduct(productId)),
    addToCartThunk: product => dispatch(addToCartThunk(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
