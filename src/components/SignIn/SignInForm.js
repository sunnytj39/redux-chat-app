import React, { Component } from "react";

import { auth } from "../../firebase";
import * as routes from "constants/routes";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  state = {
    ...INITIAL_STATE
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    console.log(event);
    event.preventDefault();

    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={email}
          name="email"
          onChange={event => this.handleChange(event)}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          name="password"
          onChange={event => this.handleChange(event)}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default SignInForm;
