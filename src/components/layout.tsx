/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactChild } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { Normalize } from "styled-normalize"
import theme from "../theming/theme"
import { backgroundColor, textColor } from "../theming/theme-getters"

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 1150px;
  padding: 5rem 1.0875rem 5rem;
`

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }

  html, body {
    font-family: Quicksand;
    font-size: 14px;
    line-height: 1.285;
    color: ${textColor("primary")};
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.5;
    margin: .667em 0;
  }
  h1 { font-size: 1.428rem; }
  h2 { font-size: 1.26rem; }

  input, select, button {
    letter-spacing: .01em;
    padding: .786rem;
    border: 1px solid;
  }

  input, select {
    background: ${backgroundColor("primary")};
    border-color: ${textColor("lighter")};
    border-radius: 2px;

    :focus {
      box-shadow: 0 4px 10px 0 rgba(189,199,222,0.23);
      outline: none;
    }

    :placeholder {
      color: ${textColor("light")};
    }
  }

  select, option {
    padding-top: .643rem;
    padding-bottom: .643rem;
  }

  button {
    color: #fff;
    background: ${textColor("accent")};
    border-color: ${textColor("accent")};
  }

  svg {
    fill: currentColor;
    vertical-align: middle;
    display: inline-block;
  }
`

const Layout = ({ children }: { children: ReactChild | ReactChild[] }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Normalize />
        <GlobalStyle />
        <ContentWrapper>
          <main>{children}</main>
        </ContentWrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout
