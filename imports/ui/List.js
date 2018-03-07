import React, { Component } from "react";
import ReactDOM from "react-dom";

import ListItem from "./ListItem.js";

export default class List extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("shoppingList.insert", text);

    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  }

  renderBought() {
    return this.props.bought.map(task => <li key={task._id}>{task.text}</li>);
  }

  renderTasks() {
    return this.props.tasks.map(task => (
      <ListItem key={task._id} item={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        {this.props.tasks.length === 0 ? (
          <p className="instructions">
            Ostoslista on tyhjä. Voit lisätä siihen tuotteita.
          </p>
        ) : (
          <ul className="tasks">{this.renderTasks()}</ul>
        )}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
              <input
                type="text"
                className="form-control"
                ref="textInput"
                placeholder="Lisää tuote tähän"
              />
          </div>
        </form>

        {this.props.bought.length > 0 ? (
          <div className="bought">
            <h1>Ostettu hiljattain</h1>

            <ul>{this.renderBought()}</ul>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
