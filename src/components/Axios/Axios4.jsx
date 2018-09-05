import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { showUsers } from 'components/Actions'

class App extends Component {
  
  componentWillMount() {
    this.props.showUsers()
  }
  
  renderUsersList() {
    return this.props.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      )
    })
  }
  
  render() {
    return (
      <div>
        <h2>Users List</h2>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            { this.renderUsersList() }
          </tbody>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.list
  }
}

export default connect(mapStateToProps, { showUsers })(App)