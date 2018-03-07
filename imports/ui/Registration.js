import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Accounts } from "meteor/accounts-base";

export default class Registration extends Component {
  login(event) {
    event.preventDefault();

    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    Meteor.loginWithPassword(username, password);

    ReactDOM.findDOMNode(this.refs.username).value = "";
    ReactDOM.findDOMNode(this.refs.password).value = "";
  }

  register(event) {
    event.preventDefault();

    const username = ReactDOM.findDOMNode(this.refs.newUsername).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.newPassword).value.trim();

    Accounts.createUser({
      username: username,
      password: password
    });
    Meteor.loginWithPassword(username, password);

    ReactDOM.findDOMNode(this.refs.newUsername).value = "";
    ReactDOM.findDOMNode(this.refs.newPassword).value = "";
  }

  render() {
    return (
      <div className="container">
        <h1>Kirjaudu sisään</h1>

        <form onSubmit={this.login.bind(this)}>
          <div className="form-group">
            <input
              type="text"
              ref="username"
              className="form-control"
              placeholder="Käyttäjätunnus"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              ref="password"
              className="form-control"
              placeholder="Salasana"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Kirjaudu sisään
          </button>
        </form>

        <h1>Rekisteröinti</h1>

        <form onSubmit={this.register.bind(this)}>
          <div className="form-group">
            <input
              type="text"
              ref="newUsername"
              className="form-control"
              placeholder="Käyttäjätunnus"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              ref="newPassword"
              className="form-control"
              placeholder="Salasana"
            />
          </div>
          <button type="submit" className="btn btn-primary">
          Rekisteröidy
          </button>
        </form>
      </div>
    );
  }
}
