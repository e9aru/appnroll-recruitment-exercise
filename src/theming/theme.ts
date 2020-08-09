const theme = {
  color: {
    text: {
      accent: "#0062FF",
      primary: "#243c56",
      light: "#818FA3",
      lighter: "#B9C6E0",
      lightest: "#E3E5E8",
    },
    background: {
      primary: "#fff",
    },
  },
  layout: {
    width: "73.75rem",
  },
  breakpoint: {
    tablet: 48,
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
}

export type Theme = typeof theme

export default theme
