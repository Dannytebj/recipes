import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../commons/Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

class Signup extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(({data: { signupUser }}) => {
      this.clearState();
      localStorage.setItem('token', signupUser.token);
    })
  }
  validateForm = () => {
    const { username, email, password, confirmPassword } = this.state;
    const isInvalid = !username || !email || !password || password !== confirmPassword
    return isInvalid;
  }
  render() {
    const { username, email, password, confirmPassword } = this.state;
    return (
      <div className="App">
        <h2 className="App">Sign up</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
          {(signupUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder=" Confirm Password"
                  onChange={this.handleChange}
                  value={confirmPassword}
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

export default Signup;