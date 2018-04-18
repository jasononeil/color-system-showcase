import React from "react";
import glamorous from "glamorous";
import Color from "color";
import AccessibilityHeaderIcon from "./AccessibilityHeaderIcon";
import ColorBlock from "./ColorBlock";
import { addShade, addTint, getCodeFromTemplate } from "./colorUtil";
import { accessibilityTileWidth } from "./styleUtil";

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
        <div>
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
    const variations = [90, 70, 50, 30, 10, 0, -10, -20, -30, -40, -50];
    return variations.map(amount => this.renderBlock(amount));
  }

  renderBlock(amount) {
    let { name, hex, code, codeTemplate, codeType } = this.props;
    let isHalfBlock = false,
      label = "100%",
      bgColor = Color(hex);

    if (amount != 0) {
      const absAmount = Math.abs(amount);
      if (amount > 0) {
        bgColor = addTint(bgColor, absAmount);
        code = getCodeFromTemplate(code, absAmount, codeTemplate.tint);
        label = `+${absAmount}% White`;
      } else {
        bgColor = addShade(bgColor, absAmount);
        code = getCodeFromTemplate(code, absAmount, codeTemplate.shade);
        label = `+${absAmount}% Black`;
      }
      isHalfBlock = true;
    }

    let copyableCode;
    if (codeType === "source-code") {
      copyableCode = code;
    } else if (codeType === "hex") {
      copyableCode = hex.toUpperCase();
    } else if (codeType === "rgb") {
      copyableCode = Color(hex)
        .rgb()
        .array()
        .map(Math.round)
        .join(", ");
    } else if (codeType === "cmyk") {
      copyableCode = Color(hex)
        .cmyk()
        .array()
        .map(Math.round)
        .join(", ");
    }

    return (
      <ColorBlock
        key={amount}
        colorName={name}
        label={label}
        colorCode={copyableCode}
        hex={bgColor.hex()}
        isHalfBlock={isHalfBlock}
      />
    );
  }
}

export default ColorCard;
