import React, {Component} from 'react';
import {connect} from 'react-redux';
import {priceToDollar} from '../utilities/convertPriceToDollars';
import {RiShoppingCartLine} from 'react-icons/ri';
import {Col, Button} from 'reactstrap';

class SingleCartItem extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event =>
    this.setState({[event.target.name]: event.target.value});

  render() {
    const {product} = this.props;
    const {quantity} = this.props;
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
              className="quantity"
              type="number"
              min="0"
              value={quantity}
              name="quantity"
              onChange={this.handleInputChange}
              // className="float-right"
              style={{width: '60px', marginRight: '10px', borderRadius: '3px'}}
            />
            <Button
              className="button-remove-from-cart"
              onClick={() => this.addToCart()}
            >
              Remove from <RiShoppingCartLine size={20} color="black" />
            </Button>
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.products.cart
  };
};

export default connect(mapStateToProps, null)(SingleCartItem);
