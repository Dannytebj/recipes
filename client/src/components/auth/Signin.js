import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../commons/Error';

const initialState = {
  username: '',
  password: '',

};

class Signin extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(({ data: { signinUser }}) => {
      this.clearState();
      localStorage.setItem('token', signinUser.token);
    })
  };
  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2 className="App">Sign up</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                />
                <button type="submit" className="button-primary" disabled={ loading || this.validateForm()}>Submit</button>
                { error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default Signin;