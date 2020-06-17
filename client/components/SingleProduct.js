import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSingleProduct} from '../store/products';
import {Container, Col, Row, Button} from 'reactstrap';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }

  render() {
    const {product} = this.props;

    return (
      <div>
        <h2 className="title-single-product">{product.name}</h2>
        <div className="single-view-item">
          <Col>
            <img src={product.imageUrl} height="200px" />
          </Col>
          <Col>
            <div>Price: {(product.price / 100).toFixed(2)}</div>
            <div>Quantity</div>
            <div>Description:</div>
            <div>{product.description}</div>
          </Col>
        </div>
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
