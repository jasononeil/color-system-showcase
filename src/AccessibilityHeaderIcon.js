import React from "react";
import glamorous from "glamorous";
import { accessibilityTileWidth, sizeInRem } from "./styleUtil";

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

export default AccessibilityHeaderIcon;
