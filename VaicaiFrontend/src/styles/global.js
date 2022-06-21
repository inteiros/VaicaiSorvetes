import { createGlobalStyle } from 'styled-components';
import { shade } from 'polished';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${shade(0.1, '#ff9000')};
    color: #FFF;
    -webkit-font-smoothing: antialiased;

    ::-webkit-scrollbar {
    display: none;
}

    
  }

  body, input, button {
    font-family: 'Poppins', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    color: #FFF;
  }

  button {
    cursor: pointer;
  }
`;
