import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  Cart,
  HomePage,
  Checkout,
  OrderConfirmation,
  NewProductForm,
  AllUsers
} from './components';
import {me} from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/users" component={AllUsers} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/add_new_product" component={NewProductForm} />
        <Route
          exact
          path="/checkout/orderConfirmation"
          component={OrderConfirmation}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
