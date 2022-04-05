import styled, { createGlobalStyle, css } from 'styled-components'

// Components
import { Container } from 'components/container/Container'

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: var(--background-solid);
  overflow-y: scroll;
`
export const PageContainer = styled(Container)`
  height: calc(100vh - var(--top-bar-height));
`
// Global styles. CSS var definitions.
export const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        background: var(--background-solid);
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* Remove arrows from number input */

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }

    *, body {
        margin: 0;
        font-family: 'Montserrat', sans-serif; 
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: neutralscale;
        font-size: var(--font-medium);
        color: var(--font-color);
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }

    h1, h2, h3, h4 {
        margin-bottom:var(--size-medium);
    }

    :root{
        ${({ theme }) => css`
          /* Colors */
          --neutral-lightest: ${theme.colors.neutrals.lightest};
          --neutral-lighter: ${theme.colors.neutrals.lighter};
          --neutral-light: ${theme.colors.neutrals.light};
          --neutral: ${theme.colors.neutrals.base};
          --neutral-dark: ${theme.colors.neutrals.dark};
          --neutral-darker: ${theme.colors.neutrals.darker};
          --neutral-darkest: ${theme.colors.neutrals.darkest};

          --neutral-transparent: ${theme.colors.neutrals.baseTransparent};

          --primary-lighter: ${theme.colors.primary.lighter};
          --primary-light: ${theme.colors.primary.light};
          --primary: ${theme.colors.primary.base};
          --primary-dark: ${theme.colors.primary.dark};
          --primary-darker: ${theme.colors.primary.darker};

          --secondary-lighter: ${theme.colors.secondary.lighter};
          --secondary-light: ${theme.colors.secondary.light};
          --secondary: ${theme.colors.secondary.base};
          --secondary-dark: ${theme.colors.secondary.dark};
          --secondary-darker: ${theme.colors.secondary.darker};

          --disabled: ${theme.colors.font.default.dark};

          --warning: ${theme.colors.warning.base};
          --warning-light: ${theme.colors.warning.light};

          --error: ${theme.colors.error.base};
          --error-light: ${theme.colors.error.light};

          --success: ${theme.colors.success.base};
          --success-light: ${theme.colors.success.light};

          /* Global Styles */
          --background-solid: var(--neutral-darker);
          --background-gradient-accent: ${theme.colors.background.gradient
            .accent};
          --background-gradient-neutral: ${theme.colors.background.gradient
            .neutral};
          --form-element-padding: 10px;

          /* Splash */
          --splash--background: linear-gradient(
            315deg,
            #b300fdc4 0%,
            #1f8299 100%
          );
          --splash-link-pill-background: var(--neutral-transparent);

          /* Borders */
          --border-color: var(--neutral-light);
          --border: solid 1px var(--border-color);
          --disabled-border: solid var(--disabled) 1px;
          --border-radius-large: 12px;
          --border-radius-medium: 8px;
          --border-radius-small: 4px;
          --border-radius-rounded: 50%;
          --border-radius-pill: 1000px;

          /* Shadows */
          --focus-shadow: 0px 0px 0px 3px var(--primary);
          --danger-shadow: 0px 0px 0px 3px var(--danger);

          --depth-shadow-small: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
          --depth-shadow-medium: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
          --depth-shadow-large: 0px 0px 8px 0px rgba(0, 0, 0, 0.8);

          /* Transitions */
          --transition-shortest: ease 80ms;
          --transition-shorter: ease 100ms;
          --transition-medium: ease 200ms;
          --transition-longer: ease 300ms;
          --transition-longest: ease 400ms;

          /* Sizes */
          --size-minuscule: 2px;
          --size-extra-small: 4px;
          --size-small: 8px;
          --size-medium: 16px;
          --size-large: 24px;
          --size-extra-large: 32px;
          --size-gigantic: 40px;

          /* Typography */
          --font-color: ${theme.colors.font.default.base};
          --font-color-darker: ${theme.colors.font.default.dark};

          --font-extra-minuscule: 8px;
          --font-minuscule: 12px;
          --font-extra-small: 14px;
          --font-small: 16px;
          --font-medium: 18px;
          --font-large: 20px;
          --font-extra-large: 22px;

          --line-medium: 18px;
          --line-large: 20px;
          --line-extra-large: 22px;

          --font-heading-smallest: 16px;
          --font-heading-extra-small: 18px;
          --font-heading-small: 20px;
          --font-heading-medium: 22px;
          --font-heading-large: 24px;
          --font-heading-extra-large: 26px;
          --font-heading-largest: 28px;

          --font-weight-thin: 200;
          --font-weight-light: 300;
          --font-weight-regular: 400;
          --font-weight-medium: 500;
          --font-weight-semi-bold: 600;
          --font-weight-bold: bold;

          /* Topbar */
          --top-bar-height: 70px;
          --top-bar-item-height: 41px;
          --top-bar-background: rgb(25, 27, 31, 0.55);
          --top-bar-blur: 8px;

          /* Toast */
          --toast-max-width: 750px;

          --toast-min-width: 300px;
          --toast-background: var(--neutral);
          --toast-shadow: var(--depth-shadow-medium);
          --toast-border: solid 1px var(--neutral-lighter);

          /* Footer */
          --footer-height: 200px;

          /* Card */
          --card-background: var(--neutral-dark);
          --card-border: var(--border);
          --card-padding: var(--size-large);
          --card-blur: 8px;

          /* Skeleton */
          --skeleton-animation-speed: 600ms;
          --skeleton-height: 20px;

          /* Icon */
          --icon-size-default: var(--font-medium);
          --icon-size-large: 20px;
          --icon-size-extra-large: 28px;
          --icon-size-largest: var(--font-largest);

          --icon-button-size: 30px;
          --icon-button-font-size: 22px;

          --icon-card-background: var(--neutral-light);
          --icon-card-size: 50px;
          --icon-card-font-size: 28px;

          /* Input */
          --input-background: var(--neutral-lighter);
          --input-background-active: var(--neutral-light);
          --input-border-hover: solid 1px var(--neutral-lightest);
          --input-border-radius: var(--border-radius-medium);
          --input-border: solid 1px var(--neutral-lightest);
          --input-shadow: var(--depth-shadow-medium);
          --input-disabled-font-color: var(--disabled);

          /* Button */
          --button-font-size: var(--font-medium);
          --button-font-color-disabled: var(--disabled);
          --button-background: linear-gradient(
            45deg,
            var(--primary),
            var(--secondary-dark)
          );
          --button-background-hover: linear-gradient(
            45deg,
            var(--primary-light),
            var(--secondary-dark)
          );
          --button-background-disabled: linear-gradient(
            45deg,
            var(--primary-darker),
            var(--secondary-darker)
          );

          --button-border: none;
          --button-letter-spacing: 0.8px;

          --connect-button-background: linear-gradient(
            45deg,
            var(--secondary),
            var(--primary)
          );
          --connect-button-background-hover: linear-gradient(
            45deg,
            var(--secondary-light),
            var(--primary)
          );

          --connect-button-border: none;
        `}
    }
`
