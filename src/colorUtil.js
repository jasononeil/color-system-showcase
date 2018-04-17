import Color from "color";
import wcag from "wcag-contrast-verifier/lib/wcag";

export function addTint(color, percentage) {
  return color.mix(Color("#ffffff"), percentage / 100);
}

export function addShade(color, percentage) {
  return color.mix(Color("#000000"), percentage / 100);
}

export function shouldUseWhiteText(hexColor) {
  const whiteContrast = wcag.getContrastRatio(hexColor, "#ffffff"),
    blackContrast = wcag.getContrastRatio(hexColor, "#000000");
  return whiteContrast > blackContrast;
}

export function getCodeFromTemplate(colorCode, amount, codeTemplate) {
  return codeTemplate
    .replace("${color}", colorCode)
    .replace("${amount}", amount);
}

export function contrastIsLevelAA(backgroundHex, foregroundHex, fontSize) {
  return wcag.verifyContrastRatio(backgroundHex, foregroundHex, fontSize)
    .WCAG_AA;
}