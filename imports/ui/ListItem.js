import React, { Component } from "react";

export default class ListItem extends Component {
  markAsBought() {
    Meteor.call("shoppingList.markAsBought", this.props.item._id);
  }

  render() {
    return (
      <li className="row shopping-list-item">
        <div className="col align-self-center">
          <span className="text">{this.props.item.text}</span>
        </div>

        <div className="col col-lg-2 mark-as-bought align-self-center">
          <button className="btn btn-success" onClick={this.markAsBought.bind(this)}>
            Ostettu
          </button>
        </div>
      </li>
    );
  }
}
