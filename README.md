# Color System Showcase

A showcase to show off your brand colors.

Features:

* Specify your brand colors
* See automatic tints (add white) and shades (add black) derived from your palette
* See at-a-glance information on whether white or black text is considered accessible
* Compare any two tints or shades and check accessibility
* Enter any hex value and find the nearest brand color

Built with React. Based on the work of the Culture Amp "Kaizen" design system.

## Schema

Example JSON:

```json
{
  "title": "Brand Colors",
  "palette": [
    {
      "title": "Primary Colors",
      "colors": [
        { "name": "Coral", "hex": "#f04c5d", "code": "$ca-palette-coral" },
        { "name": "Paper", "hex": "#f2edde", "code": "$ca-palette-paper" },
        { "name": "Ink", "hex": "#3e4543", "code": "$ca-palette-ink" }
      ]
    },
    {
      "title": "Secondary Colors",
      "colors": [
        {
          "name": "Seedling",
          "hex": "#45ad8f",
          "code": "$ca-palette-seedling"
        },
        { "name": "Ocean", "hex": "#1b7688", "code": "$ca-palette-ocean" },
        {
          "name": "Wisteria",
          "hex": "#727193",
          "code": "$ca-palette-wisteria"
        },
        { "name": "Lapis", "hex": "#253c64", "code": "$ca-palette-lapis" },
        { "name": "Peach", "hex": "#f3786d", "code": "$ca-palette-peach" },
        { "name": "Yuzu", "hex": "#ffce1e", "code": "$ca-palette-yuzu" }
      ]
    },
    {
      "title": "Tertiary Colors",
      "colors": [
        { "name": "Stone", "hex": "#f9f9f9", "code": "$ca-palette-stone" },
        {
          "name": "Positive Delta",
          "hex": "#43e699",
          "code": "$ca-palette-positive-delta"
        },
        {
          "name": "Negative Delta",
          "hex": "#ff4757",
          "code": "$ca-palette-negative-delta"
        }
      ]
    }
  ],
  "codeTemplate": {
    "tint": "add-tint(${color}, ${amount})",
    "shade": "add-shade(${color}, ${amount})"
  }
}
```
