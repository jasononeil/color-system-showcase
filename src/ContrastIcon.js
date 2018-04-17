import React from "react";
import glamorous from "glamorous";
import wcag from "wcag-contrast-verifier/lib/wcag";
import { contrastIsLevelAA } from "./colorUtil";
import { accessibilityTileWidth } from "./styleUtil";

function ContrastIcon({
  backgroundColor,
  textColor,
  colorName,
  textColorName,
  size
}) {
  const isValid = contrastIsLevelAA(backgroundColor, textColor, size);
  const title = `${textColorName} text on '${colorName}' with a font size of at least ${size}pt is level AA contrast.`;
  const Tile = glamorous.div({
    width: accessibilityTileWidth,
    textAlign: "center",
    transform: "translateY(3px)",
    color: textColor
  });
  return <Tile>{isValid && <span title={title}>✓</span>}</Tile>;
}

export default ContrastIcon;
