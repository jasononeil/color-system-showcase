import React from "react";
import ReactDOM from "react-dom";
import ColorSystemShowcase from "./ColorSystemShowcase";
import "css!https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,600";

class ColorSystemEnthraler {
  constructor(environment) {
    this.container = environment.container;
    this.environment = environment;
  }

  render(authorData) {
    ReactDOM.render(
      <ColorSystemShowcase {...authorData} />,
      this.container,
      // After render, update the height of the iFrame.
      () => this.environment.requestHeightChange()
    );
  }
}

export default ColorSystemEnthraler;
