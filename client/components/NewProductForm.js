import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {Col, Button} from 'reactstrap';
import {Form} from 'react-bootstrap';

class NewProductForm extends Component {
  handleInputChange = event =>
    this.setState({[event.target.name]: event.target.value});

  addToCart = () => {
    this.props.addToCartThunk(this.props.product, this.state.quantity);
    this.setState({
      quantity: 1
    });
  };

  render() {
    return (
      <Form className="add-form">
        <div className="add-form-title">Add a new product</div>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="product's name" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>ImageUrl</Form.Label>
          <Form.Control name="image" type="text" placeholder="imageUrl" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Example multiple select</Form.Label>
          <input
            type="number"
            // value={this.state.quantity}
            name="quantity"
            onChange={this.handleInputChange}
            style={{width: '60px', marginRight: '10px', borderRadius: '3px'}}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Button href="./products" size="lg" className="button-add-new-product">
          ADD
        </Button>
      </Form>
    );
  }
}

export default NewProductForm;
