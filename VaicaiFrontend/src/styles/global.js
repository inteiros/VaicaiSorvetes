import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    .example::-webkit-scrollbar {
    	display: none;
    }
    .example {
    -ms-overflow-style: none;
    }
  }

  body {
    background: #7b1fa2;
    color: #4a148c;
    -webkit-font-smoothing: antialiased;

    ::-webkit-scrollbar {
    display: none;
}

    overflow-x: hidden;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    color: #4a148c;
  }

  button {
    cursor: pointer;
  }
`;
