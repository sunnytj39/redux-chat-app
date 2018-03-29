import React, { Component } from "react";
import { auth, db } from "../../firebase";
import * as routes from "constants/routes";

class SignUpForm extends Component {
  INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null
  };

  state = {
    ...this.INITIAL_STATE
  };

  initialize = () => {
    this.setState(...this.INITIAL_STATE);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, email, passwordOne } = this.state;

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db
          .SignUp(authUser.uid, username, email)
          .then(() => {
            this.initialize();
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState({ error: error });
          });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      username === "" ||
      email === "";

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={username}
          name="username"
          onChange={event => this.handleChange(event)}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          name="email"
          onChange={event => this.handleChange(event)}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          name="passwordOne"
          onChange={event => this.handleChange(event)}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          name="passwordTwo"
          onChange={event => this.handleChange(event)}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default SignUpForm;
