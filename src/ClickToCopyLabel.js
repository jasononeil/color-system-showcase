import React from "react";
import glamorous from "glamorous";
import wcag from "wcag-contrast-verifier/lib/wcag";
import { sizeInRem } from "./styleUtil";

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

export default ClickToCopyLabel;
