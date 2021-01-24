import '@emotion/react'
import { ThemeType } from './styles/theme';

// Extendar vår egna theme så att vi automatiskt kan ha tillgång
// till theme-typen i styled-components
declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}