import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';
import {Form} from 'react-bootstrap';
import {AdminAddNewProductThunk} from '../store/products';

class NewProductForm extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      name: '',
      price: 0,
      description: '',
      imageUrl: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.AdminAddNewProductThunk(this.state);
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <Form className="add-form" onSubmit={this.handleSubmit}>
        <div className="add-form-title">Add a new product</div>
        <div className="col-md-6 mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Product's name"
            required=""
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="lastName">ImageUrl</label>
          <input
            type="text"
            name="imageUrl"
            className="form-control"
            id="imageUrl"
            placeholder="imageUrl"
            required=""
            value={this.state.imageUrl}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            id="price"
            placeholder="enter in the format DDCC (Ex. $30 is 3000)"
            required=""
            value={this.state.price}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="price">Quantity</label>
          <input
            type="number"
            placeholder="100"
            min="0"
            name="quantity"
            onChange={this.handleInputChange}
            style={{width: '60px', marginRight: '10px', borderRadius: '3px'}}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="description"
            placeholder="About the product"
            className="form-control"
            required=""
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
        </div>
        <Button
          href="./products"
          size="lg"
          className="button-add-new-product"
          type="submit"
        >
          Create
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AdminAddNewProductThunk: data => dispatch(AdminAddNewProductThunk(data))
  };
};

export default connect(null, mapDispatchToProps)(NewProductForm);
