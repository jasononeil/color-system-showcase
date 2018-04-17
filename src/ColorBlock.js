import React from "react";
import ReactDOM from "react-dom";
import glamorous from "glamorous";
import { shouldUseWhiteText } from "./colorUtil";
import { accessibilityTileWidth } from "./styleUtil";
import ContrastIcon from "./ContrastIcon";
import ClickToCopyLabel from "./ClickToCopyLabel";

function ColorBlock({ colorName, label, colorCode, hex, isHalfBlock }) {
  const shouldUseWhite = shouldUseWhiteText(hex);
  const name = `${colorName} ${label}`;
  const white = "#ffffff";
  const black = "#000000";

  const gridSize = "1.5rem";
  const bottomMargin = "2px";
  const blockSize = isHalfBlock ? 2 : 4;

  const ColorBlockTr = glamorous.tr({
    height: `calc(${gridSize} * ${blockSize} - ${bottomMargin})`,
    margin: `0 0 ${bottomMargin} 0`,
    paddingTop: `calc(${gridSize} / 2 + ${bottomMargin / 2})`,
    paddingBottom: `calc(${gridSize} / 2 - ${bottomMargin / 2})`,
    color: shouldUseWhite ? "white" : "black",
    background: hex,
    paddingLeft: "0.5em"
  });

  const AccessibilityCell = glamorous.td({
    width: accessibilityTileWidth
  });

  return (
    <ColorBlockTr key={name}>
      <th>
        <ClickToCopyLabel label={label} value={colorCode} />
      </th>
      <AccessibilityCell>
        <ContrastIcon
          backgroundColor={hex}
          colorName={name}
          textColor="#FFFFFF"
          textColorName="White"
          size={12}
          key="white small"
        />
      </AccessibilityCell>
      <AccessibilityCell>
        <ContrastIcon
          backgroundColor={hex}
          colorName={name}
          textColor="#FFFFFF"
          textColorName="White"
          size={18}
          key="white large"
        />
      </AccessibilityCell>
      <AccessibilityCell>
        <ContrastIcon
          backgroundColor={hex}
          colorName={name}
          textColor="#000000"
          textColorName="Black"
          size={12}
          key="black small"
        />
      </AccessibilityCell>
      <AccessibilityCell>
        <ContrastIcon
          backgroundColor={hex}
          colorName={name}
          textColor="#000000"
          textColorName="Black"
          size={18}
          key="black large"
        />
      </AccessibilityCell>
    </ColorBlockTr>
  );
}

export default ColorBlock;
