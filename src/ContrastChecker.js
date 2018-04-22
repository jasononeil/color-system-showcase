import React from "react";
import glamorous from "glamorous";
import Color from "color";
import wcag from "wcag-contrast-verifier/lib/wcag";
import {
  varyColor,
  getContrastRatio,
  contrastIsLevelAA,
  contrastIsLevelAAA,
  colorName,
  variationName
} from "./colorUtil";

class ContrastChecker extends React.Component {
  constructor(props) {
    super(props);
    const colors = this.getColors();
    this.state = {
      bgColor: colors[0].name,
      bgVariation: 0,
      fgColor: colors[0].name,
      fgVariation: -100
    };
  }

  getColors() {
    const palette = this.props.palette;
    return flatten(palette.map(section => section.colors));
  }

  getColorByName(name) {
    return this.getColors().find(c => c.name == name);
  }

  varyColor(name, amount) {
    const hex = this.getColorByName(name).hex;
    return varyColor(Color(hex), amount);
  }

  render() {
    const colors = this.getColors();
    const { bgColor, bgVariation, fgColor, fgVariation } = this.state;

    const bgHex = this.varyColor(bgColor, bgVariation).hex();
    const fgHex = this.varyColor(fgColor, fgVariation).hex();

    const Grid = glamorous.div({
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      fontFamily: "Source Sans Pro, Helvetica, Arial, sans-serif"
    });
    const H2 = glamorous.h2({
      gridColumn: "1 / -1"
    });
    const TextPreview = glamorous.div({
      background: bgHex,
      color: fgHex,
      padding: "10px",
      margin: "2px",
      gridColumn: "1 / -1"
    });
    const StatementText = glamorous.p({
      fontSize: "1.5rem",
      margin: "0 10px 10px 10px",
      textAlign: "center"
    });
    const Table = glamorous.table({
      color: fgHex,
      margin: "0 auto"
    });

    return (
      <Grid>
        <H2>Contrast Checker</H2>
        <SelectColor
          colors={colors}
          name="Background"
          onUpdateColor={c => this.setState({ bgColor: c })}
          onUpdateVariation={v => this.setState({ bgVariation: v })}
          currentColor={bgColor}
          currentVariation={bgVariation}
        />
        <SelectColor
          colors={colors}
          name="Foreground"
          onUpdateColor={c => this.setState({ fgColor: c })}
          onUpdateVariation={v => this.setState({ fgVariation: v })}
          currentColor={fgColor}
          currentVariation={fgVariation}
        />
        <TextPreview>
          <StatementText>
            <strong>{colorName(fgColor, fgVariation)}</strong> text on a{" "}
            <strong>{colorName(bgColor, bgVariation)}</strong> background has a
            contrast ratio of{" "}
            <strong>{getContrastRatio(bgHex, fgHex, 2)}</strong>
          </StatementText>
          <Table>
            <tr>
              <th />
              <th>AA Accessible</th>
              <th>AAA Accessible</th>
            </tr>
            <tr>
              <th>Small Text</th>
              <td>{contrastIsLevelAA(bgHex, fgHex, 12) ? "✓" : "✗"}</td>
              <td>{contrastIsLevelAAA(bgHex, fgHex, 12) ? "✓" : "✗"}</td>
            </tr>
            <tr>
              <th>Large Text (18pt+)</th>
              <td>{contrastIsLevelAA(bgHex, fgHex, 18) ? "✓" : "✗"}</td>
              <td>{contrastIsLevelAAA(bgHex, fgHex, 18) ? "✓" : "✗"}</td>
            </tr>
          </Table>
        </TextPreview>
      </Grid>
    );
  }
}

function SelectColor({
  name,
  colors,
  onUpdateColor,
  onUpdateVariation,
  currentColor,
  currentVariation
}) {
  return (
    <fieldset>
      <legend>{name}</legend>
      <select
        onChange={e => onUpdateColor(e.target.value)}
        value={currentColor}
      >
        {colors.map(color => (
          <option value={color.name} key={color.name}>
            {color.name}
          </option>
        ))}
      </select>
      <select
        onChange={e => onUpdateVariation(e.target.value)}
        value={currentVariation}
      >
        {variations.map(variation => (
          <option value={variation} key={variation}>
            {variationName(variation)}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

function flatten(arr) {
  return arr.reduce((acc, e) => acc.concat(e), []);
}

const variations = [
  -100,
  -90,
  -80,
  -70,
  -60,
  -50,
  -40,
  -30,
  -20,
  -10,
  0,
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100
];

export default ContrastChecker;
