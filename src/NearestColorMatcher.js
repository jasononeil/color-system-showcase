import React from "react";
import glamorous from "glamorous";
import Color from "color";
import nearest from "nearest-color-shade";
import { colorName, varyColor, getCodeFromTemplate } from "./colorUtil";

class NearestColorMatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorToMatch: "1B7688"
    };
  }

  render() {
    const colors = {};
    for (let section of this.props.palette) {
      for (let color of section.colors) {
        colors[color.name] = Color(color.hex);
      }
    }

    let colorToMatch = this.state.colorToMatch;
    if (colorToMatch.charAt(0) !== "#") {
      colorToMatch = "#" + colorToMatch;
    }
    const match = nearest(colors, Color(colorToMatch));
    const nearestBaseColor = colors[match.color];
    const variant =
      !match.tint && !match.shade
        ? 0
        : match.tint
          ? match.tint
          : -1 * match.shade;
    const nearestColor = varyColor(nearestBaseColor, variant * 100);
    const code = getCodeFromTemplate(
      "some code",
      variant,
      this.props.codeTemplate
    );

    const Grid = glamorous.div({
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      fontFamily: "Source Sans Pro, Helvetica, Arial, sans-serif",
      gridColumnGap: "3px",
      justifyContent: "center"
    });
    const ColorToMatchForm = glamorous.form({
      background: colorToMatch,
      gridColumn: "1 / 2",
      margin: 0,
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around"
    });
    const Label = glamorous.label({
      display: "block"
    });
    const H2 = glamorous.h2({
      gridColumn: "1 / -1"
    });
    const TextPreview = glamorous.div({
      background: nearestColor.hex(),
      padding: "30px",
      margin: 0,
      gridColumn: "2 / 3",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    });
    const StatementText = glamorous.p({
      fontSize: "1.5rem",
      textAlign: "center"
    });

    return (
      <Grid>
        <H2>Nearest Color Matcher</H2>
        <ColorToMatchForm>
          <Label htmlFor="nearest-color-input">Hex color:</Label>
          <input
            id="nearest-color-input"
            type="text"
            defaultValue={colorToMatch}
            onBlur={e => {
              this.setState({ colorToMatch: e.target.value });
            }}
          />
        </ColorToMatchForm>
        <TextPreview>
          <StatementText>
            Nearest color is {colorName(match.color, variant * 100)} ({nearestColor.hex()})
          </StatementText>
        </TextPreview>
      </Grid>
    );
  }
}

export default NearestColorMatcher;
