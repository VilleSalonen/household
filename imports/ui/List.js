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
          <p className="instructions">Ostoslista on tyhjä. Voit lisätä siihen tuotteita.</p>
        ) : (
          <ul className="tasks">{this.renderTasks()}</ul>
        )}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control mb-2"
                ref="textInput"
                placeholder="Mitä ostetaan?"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-2">
                Lisää listalle
              </button>
            </div>
          </div>
        </form>

        <div className="bought">
          <h1>Ostettu hiljattain</h1>

          <ul>{this.renderBought()}</ul>
        </div>
      </div>
    );
  }
}
