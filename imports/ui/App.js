import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

import { ShoppingList } from "../api/tasks.js";

import List from "./List.js";
import AccountsUIWrapper from "./AccountsUIWrapper.js";
import Registration from "./Registration.js";

// App component - represents the whole app
class App extends Component {
  logout() {
    Meteor.logout();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Tuo Kaupasta
          </a>

          {this.props.currentUser ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="btn" onClick={this.logout.bind(this)}>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            ""
          )}
        </nav>

        {this.props.currentUser ? (
          <List tasks={this.props.tasks} bought={this.props.bought} />
        ) : (
          <Registration />
        )}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("shoppingList");

  return {
    tasks: ShoppingList.find(
      { bought: false },
      { sort: { addedOn: -1 } }
    ).fetch(),
    bought: ShoppingList.find(
      { bought: true },
      { sort: { boughtOn: -1 }, limit: 10 }
    ).fetch(),
    currentUser: Meteor.user()
  };
})(App);
