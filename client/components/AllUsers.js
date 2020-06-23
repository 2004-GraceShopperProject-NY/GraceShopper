import React, {Component} from 'react';
import {connect} from 'react-redux';
import {gotAllUsers} from '../store/allUsers';

export class AllUsers extends Component {
  componentDidMount() {
    this.props.gotAllUsers();
  }

  render() {
    const {allUsers} = this.props;

    return (
      <div>
        <h2 className="title-all-products">Registered Customers</h2>
        <div className="allUsers">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.user.role === 'admin',
    allUsers: state.allUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gotAllUsers: () => dispatch(gotAllUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
