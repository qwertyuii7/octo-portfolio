import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-error": "#690005", "tertiary": "#e3dad8", "secondary-fixed": "#e5e2e1",
        "tertiary-fixed": "#eae0de", "surface": "#121414", "surface-tint": "#c6c6c6",
        "background": "#121414", "surface-dim": "#121414", "primary-fixed": "#e3e2e2",
        "inverse-surface": "#e2e2e2", "on-secondary-fixed-variant": "#474746",
        "surface-container": "#1e2020", "outline-variant": "#444748",
        "on-secondary-container": "#b7b5b4", "on-primary": "#2f3131",
        "surface-container-lowest": "#0c0f0f", "surface-bright": "#38393a",
        "secondary-container": "#474746", "secondary-fixed-dim": "#c8c6c5",
        "primary": "#dcdcdc", "on-tertiary-fixed": "#1f1b1a",
        "inverse-on-surface": "#2f3131", "on-secondary": "#313030",
        "surface-container-low": "#1a1c1c", "on-primary-fixed": "#1a1c1c",
        "on-tertiary-container": "#534d4b", "on-primary-container": "#4d4e4f",
        "on-error-container": "#ffdad6", "on-tertiary": "#342f2e",
        "surface-container-highest": "#333535", "surface-container-high": "#282a2b",
        "on-surface-variant": "#c4c7c7", "on-background": "#e2e2e2",
        "outline": "#8e9192", "on-surface": "#e2e2e2", "inverse-primary": "#5d5e5f",
        "secondary": "#c8c6c5", "on-primary-fixed-variant": "#464747",
        "on-tertiary-fixed-variant": "#4b4544", "tertiary-container": "#c7bebc",
        "tertiary-fixed-dim": "#cec4c2", "error-container": "#93000a",
        "surface-variant": "#333535", "on-secondary-fixed": "#1c1b1b",
        "primary-container": "#c0c0c0", "error": "#ffb4ab", "primary-fixed-dim": "#c6c6c6",
        "grid": "#2A2A2A"
      },
      borderRadius: {
        "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"
      },
      spacing: {
        "unit": "4px", "gutter": "24px", "margin-mobile": "20px",
        "margin-desktop": "64px", "section-gap": "160px"
      },
      fontFamily: {
        "nav-link": ["IBM Plex Mono", "monospace"], "body-lg": ["IBM Plex Mono", "monospace"],
        "display-xl": ["Syne", "sans-serif"], "display-mobile": ["Syne", "sans-serif"],
        "body-md": ["IBM Plex Mono", "monospace"], "heading-md": ["Syne", "sans-serif"],
        "display-lg": ["Syne", "sans-serif"], "label-caps": ["IBM Plex Mono", "monospace"]
      },
      fontSize: {
        "nav-link": ["14px", { lineHeight: "1.0", letterSpacing: "0em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
        "display-xl": ["96px", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-mobile": ["36px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "body-md": ["14px", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
        "heading-md": ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-lg": ["72px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "800" }],
        "label-caps": ["12px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "600" }]
      }
    }
  }
} satisfies Config
