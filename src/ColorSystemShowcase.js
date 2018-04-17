import React from "react";
import ReactDOM from "react-dom";
import glamorous from "glamorous";
import Color from "color";
import wcag from "wcag-contrast-verifier/lib/wcag";
import ColorCard from "./ColorCard";
import ClickToCopyLabel from "./ClickToCopyLabel";
import {
  addTint,
  addShade,
  shouldUseWhiteText,
  getCodeFromTemplate,
  contrastIsLevelAA
} from "./colorUtil";

export default class ColorSystemShowcase extends React.Component {
  state = {
    showAccessibility: {},
    codeType: "source-code"
  };

  render() {
    const Grid = glamorous.div({
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      display: "grid",
      gridGap: "1rem",
      justifyContent: "space-between",
      fontFamily: "Source Sans Pro, Helvetica, Arial, sans-serif"
    });
    const Header = glamorous.div({
      gridColumn: "1 / -1",
      display: "flex"
    });
    const Title = glamorous.h1({
      fontWeight: 600,
      flex: 1
    });
    return (
      <Grid>
        <Header>
          <Title>{this.props.title}</Title>
          <div>
            <select
              value={this.state.codeType}
              onChange={event =>
                this.setState({ codeType: event.target.value })
              }
            >
              <option value="source-code">Source Code</option>
              <option value="hex">HEX</option>
              <option value="rgb">RGB</option>
              <option value="cmyk">CMYK</option>
            </select>
          </div>
        </Header>
        {this.props.palette.map(section =>
          this.renderColorSection(section.title, section.colors)
        )}
      </Grid>
    );
  }

  renderColorSection(title, colors) {
    const GridHeader = glamorous.h2({
      gridColumn: "1 / -1",
      fontWeight: 600
    });
    const showAccessibility = true;
    return [
      <GridHeader key={title}>{title}</GridHeader>,
      colors.map(color => (
        <ColorCard
          name={color.name}
          hex={color.hex}
          code={color.code}
          codeType={this.state.codeType}
          key={color.name}
          showAccessibility={showAccessibility}
          codeTemplate={this.props.codeTemplate}
        />
      ))
    ];
  }

  toggleAccessibility(section) {
    let currentValue = this.state.showAccessibility[section];
    this.setState({
      showAccessibility: {
        ...this.state.showAccessibility,
        [section]: !currentValue
      }
    });
  }
}
