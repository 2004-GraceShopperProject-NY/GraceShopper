import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import {Navbar} from 'react-bootstrap';
import {RiShoppingCartLine} from 'react-icons/ri';

const MainNavbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Navbar className="navbar-style" expand="lg">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navbar-text">
          {/* The navbar will show these links before you log in */}
          <h1 className="website-name">PANDEMIC ESSENTIALS</h1>
          <Link to="#">PE</Link>
          <Link to="#">Products</Link>
          <Link to="#">
            {' '}
            <RiShoppingCartLine size={32} color="black" />
          </Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </Navbar>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(MainNavbar);

/**
 * PROP TYPES
 */
MainNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
