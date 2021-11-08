/**
 * Customizing Chakra-UI
 * https://chakra-ui.com/docs/features/responsive-styles#customizing-breakpoints
 *
 */

// Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

// 2. Update the breakpoints as key-value pairs (#Custom_Breakpoints)
const breakpoints = createBreakpoints({
  // sm: '320px',
  // md: '768px',
  sm: '30em',
  md: '48em',
  // lg: '1024px',
  lg: '62em',
  xl: '1390px',
  '2xl': '2000px',
});

// Call `extendTheme` and pass your custom values (#Custom_Color)
const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
    app: {
      primary: '#b87514',
      brown1: '#ad3113',
      brown2: '#B87514',
      pink1: '#FEF9E6',
      pink2: '#FFF4E3',
      pink3: '#CF6662',
      pink4: '#F47573',
      grey1: '#ABABAB',
      grey2: '#5B5B5B',
      grey3: '#5E5E5E',
      grey4: '#8B8B8B',
      grey5: '#ADADAD',
      orange1: '#F3B65B',
      orange2: '#E79C37',
      orange3: '#E5E5E5',
      teal1: '#499F9C',
      teal2: '#374957',
      black1: '#3C3C3C',
    },
  },
  // use custom breakpoints
  breakpoints,
  // use custom font-family
  fonts: {
    heading: 'Nunito',
    body: 'Nunito',
  },
});

export default theme;
