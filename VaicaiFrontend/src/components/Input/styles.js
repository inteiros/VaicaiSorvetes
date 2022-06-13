import styled, { css } from 'styled-components';

import Tooltip from './Tooltip/index';

export const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 1px solid #ff8d0b;
  color: #131419;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      color: #c53030;
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff8d0b;
      border-color: #ff8d0b;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff8d0b;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #100;

    &::placeholder {
      color: #8c8c8c;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

