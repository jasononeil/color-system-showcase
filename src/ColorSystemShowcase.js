import React from "react";
import ReactDOM from "react-dom";
import glamorous from "glamorous";
import Color from "color";
import wcag from "wcag-contrast-verifier/lib/wcag";
const styles = {};

export default class ColorSystemShowcase extends React.Component {
  state = {
    showAccessibility: {}
  };

  render() {
    const Grid = glamorous.div({
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      display: "grid",
      gridGap: "1rem",
      justifyContent: "space-between",
      fontFamily: "Source Sans Pro, Helvetica, Arial, sans-serif"
    });
    const Title = glamorous.h1({
      gridColumn: "1 / -1",
      fontWeight: 600
    });
    return (
      <Grid>
        <Title>{this.props.title}</Title>
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

const ActionLink = glamorous.button({
  appearance: "none",
  display: "inline",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  cursor: "pointer",
  margin: 0,
  padding: 0,
  border: "none"
});

class ColorCard extends React.Component {
  render() {
    const { name, hex } = this.props;
    const Title = glamorous.h3({
      fontWeight: 600,
      margin: 0,
      textAlign: "left"
    });
    const ColorCardTable = glamorous.table({
      width: "100%",
      tableLayout: "fixed",
      borderSpacing: "0 1px"
    });
    const IconTh = glamorous.th({
      width: accessibilityTileWidth
    });
    return (
      <div>
        <div className={styles.colorCard}>
          <ColorCardTable>
            <thead>
              <tr>
                <th>
                  <Title>{this.props.name}</Title>
                </th>
                <IconTh>
                  <AccessibilityHeaderIcon
                    isWhite={true}
                    isLarge={false}
                    hex={hex}
                  />
                </IconTh>
                <IconTh>
                  <AccessibilityHeaderIcon
                    isWhite={true}
                    isLarge={true}
                    hex={hex}
                  />
                </IconTh>
                <IconTh>
                  <AccessibilityHeaderIcon
                    isWhite={false}
                    isLarge={false}
                    hex={hex}
                  />
                </IconTh>
                <IconTh>
                  <AccessibilityHeaderIcon
                    isWhite={false}
                    isLarge={true}
                    hex={hex}
                  />
                </IconTh>
              </tr>
            </thead>
            <tbody>{this.renderColorBlocks()}</tbody>
          </ColorCardTable>
        </div>
      </div>
    );
  }

  renderColorBlocks() {
    const { name, hex, code, codeTemplate } = this.props;
    const variations = [90, 70, 50, 30, 10, 0, -10, -20, -30, -40, -50];
    return variations.map(amount => (
      <ColorBlock
        key={amount}
        colorName={name}
        hex={hex}
        colorCode={code}
        codeTemplate={codeTemplate}
        amount={amount}
        showContrast={this.props.showAccessibility}
      />
    ));
  }
}

const accessibilityTileWidth = "24px";

function AccessibilityHeaderIcon({ isWhite, isLarge, hex }) {
  const title =
    (isWhite ? "White text " : "Ink text ") +
    (isLarge ? "18pt (24px) or larger" : "smaller than 18pt (24px)");
  const TileContainer = glamorous.div({
    flex: `0 0 ${accessibilityTileWidth}`
  });
  const Tile = glamorous.span({
    color: isWhite ? "white" : "black",
    backgroundColor: hex,
    fontSize: isLarge ? sizeInRem(14) : sizeInRem(10),
    lineHeight: isLarge ? sizeInRem(19) : sizeInRem(18),
    display: "block",
    width: "15px",
    height: "15px",
    margin: "0 auto 7px",
    display: "block",
    fontFamily: "sans-serif",
    textAlign: "center"
  });
  return (
    <TileContainer>
      <Tile title={title}>A</Tile>
    </TileContainer>
  );
}

function addTint(color, percentage) {
  return color.mix(Color("#ffffff"), percentage / 100);
}

function addShade(color, percentage) {
  return color.mix(Color("#000000"), percentage / 100);
}

function shouldUseWhiteText(color) {
  const whiteContrast = wcag.getContrastRatio(color.hex(), "#ffffff"),
    blackContrast = wcag.getContrastRatio(color.hex(), "#000000");
  return whiteContrast > blackContrast;
}

function getCodeFromTemplate(colorCode, amount, codeTemplate) {
  return codeTemplate
    .replace("${color}", colorCode)
    .replace("${amount}", amount);
}

function ColorBlock({
  colorName,
  hex,
  colorCode,
  codeTemplate,
  amount,
  showContrast
}) {
  let isHalfBlock = false,
    label = "100%",
    bgColor = Color(hex);
  console.log(codeTemplate);

  if (amount != 0) {
    const absAmount = Math.abs(amount);
    if (amount > 0) {
      bgColor = addTint(bgColor, absAmount);
      colorCode = getCodeFromTemplate(colorCode, absAmount, codeTemplate.tint);
      label = `+${absAmount}% White`;
    } else {
      bgColor = addShade(bgColor, absAmount);
      colorCode = getCodeFromTemplate(colorCode, absAmount, codeTemplate.shade);
      label = `+${absAmount}% Black`;
    }
    isHalfBlock = true;
  }

  const shouldUseWhite = shouldUseWhiteText(bgColor);
  const name = `${colorName} ${label}`;
  const white = Color("#ffffff");
  const black = Color("#000000");
  //  <ColorBlockKebab bgColor={bgColor} colorAsCode={colorAsCode} />

  const gridSize = "1.5rem";
  const bottomMargin = "2px";
  const blockSize = isHalfBlock ? 2 : 4;
  const ColorBlockTr = glamorous.tr({
    height: `calc(${gridSize} * ${blockSize} - ${bottomMargin})`,
    margin: `0 0 ${bottomMargin} 0`,
    paddingTop: `calc(${gridSize} / 2 + ${bottomMargin / 2})`,
    paddingBottom: `calc(${gridSize} / 2 - ${bottomMargin / 2})`,
    color: shouldUseWhite ? "white" : "black",
    paddingLeft: "0.5em"
  });
  const AccessibilityCell = glamorous.td({
    width: accessibilityTileWidth
  });
  return (
    <ColorBlockTr
      key={bgColor.rgb().string()}
      style={{ background: bgColor.rgb().string() }}
    >
      <th>
        <ClickToCopyLabel label={label} value={colorCode} />
      </th>
      <AccessibilityCell>
        <ContrastIcon
          backgroundColor={bgColor}
          colorName={name}
          textColor={white}
          textColorName="White"
          size={12}
          key="white small"
        />
      </AccessibilityCell>
      <AccessibilityCell>
        <ContrastIcon
          backgroundColor={bgColor}
          colorName={name}
          textColor={white}
          textColorName="White"
          size={18}
          key="white large"
        />
      </AccessibilityCell>
      <AccessibilityCell>
        <ContrastIcon
          backgroundColor={bgColor}
          colorName={name}
          textColor={black}
          textColorName="Black"
          size={12}
          key="black small"
        />
      </AccessibilityCell>
      <AccessibilityCell>
        <ContrastIcon
          backgroundColor={bgColor}
          colorName={name}
          textColor={black}
          textColorName="Black"
          size={18}
          key="black large"
        />
      </AccessibilityCell>
    </ColorBlockTr>
  );
}

function ClickToCopyLabel({ label, value }) {
  const Div = glamorous.div({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  });
  const Label = glamorous.p({
    fontWeight: 300,
    fontSize: sizeInRem(18),
    textAlign: "left",
    margin: 0
  });
  const Input = glamorous.input({
    display: "block",
    textAlign: "left",
    border: "none",
    width: "100%",
    background: "transparent",
    color: "inherit",
    textOverflow: "ellipsis",
    fontFamily: "Source Sans Pro, sans-serif",
    fontStyle: "italic",
    fontSize: sizeInRem(14),
    fontWeight: 300
  });
  let inputField;
  const action = () => {
    if (inputField) {
      console.log(inputField);
      inputField.select();
      document.execCommand("copy");
    }
  };
  return (
    <Div title="Copy to clipboard" onClick={action}>
      <Label>{label}</Label>
      <Input
        type="text"
        value={value}
        readOnly={true}
        innerRef={i => (inputField = i)}
      />
    </Div>
  );
}

function contrastIsLevelAA(backgroundHex, foregroundHex, fontSize) {
  return wcag.verifyContrastRatio(backgroundHex, foregroundHex, fontSize)
    .WCAG_AA;
}

function ContrastIcon({
  backgroundColor,
  textColor,
  colorName,
  textColorName,
  size
}) {
  console.log(backgroundColor.hex(), textColor.hex());
  const isValid = contrastIsLevelAA(
    backgroundColor.hex(),
    textColor.hex(),
    size
  );
  const title = `${textColorName} text on '${colorName}' with a font size of at least ${size}pt is level AA contrast.`;
  const Tile = glamorous.div({
    width: accessibilityTileWidth,
    textAlign: "center",
    transform: "translateY(3px)",
    color: textColor.rgb()
  });
  return <Tile>{isValid && <span title={title}>✓</span>}</Tile>;
}

function sizeInRem(sizeInPx) {
  return `${sizeInPx / 16}rem`;
}
