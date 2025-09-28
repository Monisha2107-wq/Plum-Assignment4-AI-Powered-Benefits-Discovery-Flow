import { createGlobalStyle } from "styled-components";
import { useTheme } from "../context/ThemeContext";

const GlobalStylesWithTheme = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: ${(props) => props.themeColors.background};
    color: ${(props) => props.themeColors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
  }
`;

const GlobalStyles = () => {
  const { themeColors } = useTheme();
  return <GlobalStylesWithTheme themeColors={themeColors} />;
};

export default GlobalStyles;
