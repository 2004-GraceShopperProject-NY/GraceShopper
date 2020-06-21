import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import {Navbar, Row, Col} from 'react-bootstrap';
import {RiShoppingCartLine} from 'react-icons/ri';
import {getCartThunk} from '../store/guestCart';
import {fetchProducts} from '../store/products';

class MainNavbar extends Component {
  componentWillMount() {
    this.props.allProducts();
    this.props.getCartThunk();
  }

  render() {
    return (
      <div>
        <Navbar className="navbar-style" expand="lg">
          <Col className="navbar-title-and-menu">
            {this.props.isLoggedIn ? (
              <div>
                <h1 className="website-name">PANDEMIC ESSENTIALS</h1>
                <Row className="navbar-row">
                  <img
                    className="navbar-image"
                    src="/women-shopping-cart.svg"
                    alt="WomenShoppingCard"
                  />
                  <Link to="/home">Home</Link>
                  <Link to="/products">Products</Link>
                  <Link className="cart-navbar-link" to="/cart">
                    {' '}
                    <RiShoppingCartLine color="darkcyan" size={38} />
                    <p className="qty">{this.props.cartQuantity}</p>
                  </Link>
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </Row>
              </div>
            ) : (
              <div className="navbar-text">
                <h1 className="website-name">PANDEMIC ESSENTIALS</h1>
                <Row className="navbar-row">
                  <img
                    className="navbar-image"
                    src="/women-shopping-cart.svg"
                    alt="WomenShoppingCard"
                  />
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  <Link className="cart-navbar-link" to="/cart">
                    {' '}
                    <RiShoppingCartLine color="darkcyan" size={38} />
                    <div className="qty">{this.props.cartQuantity}</div>
                  </Link>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </Row>
              </div>
            )}
          </Col>
        </Navbar>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartQuantity: Object.values(state.cart).reduce((acc, qty) => {
      return acc + qty;
    }, 0)
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getCartThunk() {
      dispatch(getCartThunk());
    },
    allProducts() {
      dispatch(fetchProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatch)(MainNavbar);
