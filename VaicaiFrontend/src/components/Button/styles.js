import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    margin:15px 0;
    width:100%;
    height:50px;
    font-size: 16px;
    background: ${shade(0.2, '#f46e00')};
    border-radius: 10px;
    border:none;
    outline:none;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    font-weight: 400;

    transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.4, '#f46e00')};
  }
`;
