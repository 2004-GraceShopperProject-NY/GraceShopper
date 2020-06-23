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
      adminUpdateQuantity: '',
      description: '',
      productName: ''
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

  updateProduct = () => {
    this.props.updateProduct(this.props.product.id, this.state);
    this.setState({
      adminUpdateQuantity: '',
      description: '',
      productName: ''
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
            min="0"
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
          <div className="single-view-item-page2">
            <div className="update-product">
              <h2 className="title-single-product-view">
                Update this product:
              </h2>
              <div className="update-product-info">
                <h6>Change Product Name:</h6>
                <input
                  name="productName"
                  placeholder={product.name}
                  type="text"
                  value={this.state.productName}
                  onChange={this.handleInputChange}
                />

                <h6>Inventory Quantity: </h6>
                <input
                  name="adminUpdateQuantity"
                  min="0"
                  placeholder={product.quantity}
                  type="number"
                  value={this.state.adminUpdateQuantity}
                  onChange={this.handleInputChange}
                />

                <h6>New Description:</h6>
                <input
                  name="description"
                  placeholder={product.description}
                  type="text"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />

                <Button onClick={this.updateProduct} className="button-update">
                  UPDATE
                </Button>
              </div>
            </div>
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
    updateProduct: (productId, updatedInfo) =>
      dispatch(updateProductAdminThunk(productId, updatedInfo)),
    addToCartThunk: (product, quantity) =>
      dispatch(addToCartThunk(product, quantity)),
    addToDb: (product, quantity) => dispatch(addToDb(product, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
