import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: linear-gradient(to bottom right, #f46e00, #ff8d0b);
    color: #FFF;
    -webkit-font-smoothing: antialiased;

    ::-webkit-scrollbar {
    display: none;
}

    
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
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
