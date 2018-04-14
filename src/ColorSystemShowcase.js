import React from "react";
import ReactDOM from "react-dom";
import glamorous from "glamorous";
import Color from "color";
import wcag from "wcag-contrast-verifier/lib/wcag";
const styles = {};

// TODO: load these through as props.
const Palette = [
  {
    title: "Primary Colors",
    colors: [
      { name: "Coral", hex: "#f04c5d" },
      { name: "Paper", hex: "#f2edde" },
      { name: "Ink", hex: "#3e4543" }
    ]
  },
  {
    title: "Secondary Colors",
    colors: [
      { name: "Seedling", hex: "#45ad8f" },
      { name: "Ocean", hex: "#1b7688" },
      { name: "Wisteria", hex: "#727193" },
      { name: "Lapis", hex: "#253c64" },
      { name: "Peach", hex: "#f3786d" },
      { name: "Yuzu", hex: "#ffce1e" }
    ]
  },
  {
    title: "Tertiary Colors",
    colors: [
      { name: "Stone", hex: "#f9f9f9" },
      { name: "Positive Delta", hex: "#43e699" },
      { name: "Negative Delta", hex: "#ff4757" }
    ]
  }
];

export default class ColorSystemShowcase extends React.Component {
  state = {
    showAccessibility: {}
  };

  render() {
    const Grid = glamorous.div({
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      display: "grid",
      gridGap: "1rem",
      justifyContent: "space-between"
    });
    return (
      <Grid>
        {Palette.map(section =>
          this.renderColorSection(section.title, section.colors)
        )}
      </Grid>
    );
  }

  renderColorSection(title, colors) {
    const GridHeader = glamorous.h2({
      gridColumn: "1 / -1",
      fontWeight: 200
    });
    const showAccessibility = true;
    return [
      <GridHeader key={title}>{title}</GridHeader>,
      colors.map(color => (
        <ColorCard
          name={color.name}
          hex={color.hex}
          key={color.name}
          showAccessibility={showAccessibility}
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
    const name = this.props.name;
    const hex = this.props.hex;
    const Title = glamorous.h3({
      fontWeight: 200,
      margin: 0
    });
    const ColorCardTable = glamorous.table({
      width: "100%",
      borderSpacing: "0 1px"
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
                <th>
                  <AccessibilityHeaderIcon
                    isWhite={true}
                    isLarge={false}
                    hex={hex}
                  />
                </th>
                <th>
                  <AccessibilityHeaderIcon
                    isWhite={true}
                    isLarge={true}
                    hex={hex}
                  />
                </th>
                <th>
                  <AccessibilityHeaderIcon
                    isWhite={false}
                    isLarge={false}
                    hex={hex}
                  />
                </th>
                <th>
                  <AccessibilityHeaderIcon
                    isWhite={false}
                    isLarge={true}
                    hex={hex}
                  />
                </th>
              </tr>
            </thead>
            <tbody>{this.renderColorBlocks()}</tbody>
          </ColorCardTable>
        </div>
      </div>
    );
  }

  renderColorBlocks() {
    const { name, hex } = this.props;
    const variations = [90, 70, 50, 30, 10, 0, -10, -20, -30, -40, -50];
    return variations.map(amount => (
      <ColorBlock
        key={amount}
        colorName={name}
        hex={hex}
        amount={amount}
        showContrast={this.props.showAccessibility}
      />
    ));
  }
}

const accessibilityTileWidth = "46px";

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
    fontSize: isLarge ? "14px" : "10px",
    lineHeight: isLarge ? "19px" : "18px",
    display: "block",
    width: "15px",
    height: "15px",
    lineHeight: "15px",
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

function ColorBlock({ colorName, hex, amount, showContrast }) {
  let isHalfBlock = false,
    label = "100%",
    sassVar = `$ca-palette-${colorName.toLowerCase()}`,
    bgColor = Color(hex);

  if (amount != 0) {
    const absAmount = Math.abs(amount);
    if (amount > 0) {
      bgColor = addTint(bgColor, absAmount);
      sassVar = `add-tint(${sassVar}, ${absAmount}%)`;
      label = `+${absAmount}% White`;
    } else {
      bgColor = addShade(bgColor, absAmount);
      sassVar = `add-shade(${sassVar}, ${absAmount}%)`;
      label = `+${absAmount}% Black`;
    }
    isHalfBlock = true;
  }

  const shouldUseWhite = shouldUseWhiteText(bgColor);
  const name = `${colorName} ${label}`;
  const white = Color("#ffffff");
  const black = Color("#000000");
  //  <ColorBlockKebab bgColor={bgColor} sassVar={sassVar} />

  const gridSize = "1.5rem";
  const bottomMargin = "2px";
  const blockSize = isHalfBlock ? 2 : 4;
  const ColorBlockTr = glamorous.tr({
    // boxSizing: "border-box",
    height: `calc(${gridSize} * ${blockSize} - ${bottomMargin})`,
    margin: `0 0 ${bottomMargin} 0`,
    paddingTop: `calc(${gridSize} / 2 + ${bottomMargin / 2})`,
    paddingBottom: `calc(${gridSize} / 2 - ${bottomMargin / 2})`,
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    color: shouldUseWhite ? "white" : "black",
    paddingLeft: "0.5em"
  });
  const Label = glamorous.span({
    flex: 1,
    fontWeight: 200
  });
  return (
    <ColorBlockTr
      key={bgColor.rgb().string()}
      style={{ background: bgColor.rgb().string() }}
    >
      <th>
        <Label>{label}</Label>
      </th>
      <td>
        <ContrastIcon
          backgroundColor={bgColor}
          colorName={name}
          textColor={white}
          textColorName="White"
          size={12}
          key="white small"
        />
      </td>
      <td>
        <ContrastIcon
          backgroundColor={bgColor}
          colorName={name}
          textColor={white}
          textColorName="White"
          size={18}
          key="white large"
        />
      </td>
      <td>
        <ContrastIcon
          backgroundColor={bgColor}
          colorName={name}
          textColor={black}
          textColorName="Black"
          size={12}
          key="black small"
        />
      </td>
      <td>
        <ContrastIcon
          backgroundColor={bgColor}
          colorName={name}
          textColor={black}
          textColorName="Black"
          size={18}
          key="black large"
        />
      </td>
    </ColorBlockTr>
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
    flex: `0 0 ${accessibilityTileWidth}`,
    textAlign: "center",
    transform: "translateY(3px)",
    color: textColor.rgb()
  });
  return <Tile>{isValid && <span title={title}>✓</span>}</Tile>;
}

function ColorBlockKebab({ bgColor, sassVar }) {
  const hex = bgColor.hex(),
    rgb = bgColor
      .rgb()
      .array()
      .map(Math.round)
      .join(", "),
    cmyk = bgColor
      .cmyk()
      .array()
      .map(Math.round)
      .join(", ");
  return (
    <span className={styles.kebabContainer}>
      (v)
      {/* <Kebab>
        <MenuList>
          <MenuHeader title="Color Values" />
          <MenuItem {...getColorDropdownItem("SASS", sassVar)} />
          <MenuItem {...getColorDropdownItem("HEX", hex)} />
          <MenuItem {...getColorDropdownItem("RGB", rgb)} />
          <MenuItem {...getColorDropdownItem("CMYK", cmyk)} />
        </MenuList>
      </Kebab> */}
    </span>
  );
}

const getColorDropdownItem = (type, value) => {
  let input;
  return {
    children: (
      <div className={styles.dropdownItem} title="Copy to clipboard">
        <strong>{type}</strong>
        <input
          type="text"
          value={value}
          readOnly={true}
          ref={i => (input = i)}
        />
      </div>
    ),
    action: () => {
      if (input) {
        input.select();
        document.execCommand("copy");
      }
    },
    icon: duplicate,
    hoverIcon: true
  };
};
