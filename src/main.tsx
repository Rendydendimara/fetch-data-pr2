import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import theme from './chakraUITheme';
import '@fontsource/nunito/200.css';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';
import 'focus-visible/dist/focus-visible';
import { css } from '@emotion/react';
/**
 *
 * Disable border-line by default in Chakra UI
 */
const GlobalStyles = css`
  /*
  This will hide the focus indicator if the element receives focus    via the mouse,
  but it will still show up on keyboard focus.
*/
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    {/* <GlobalStyle styles={GlobalStyles} /> */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

window.resizeTo(window.screen.availWidth / 2, window.screen.availHeight / 2);
