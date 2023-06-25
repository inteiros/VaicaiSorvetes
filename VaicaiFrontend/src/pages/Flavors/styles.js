import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
button {
  max-width: 400px;
  margin-left: 230px;
}
`;

export const Header = styled.header`
  padding: 32px 0;
  background: #ff9000;
  a {
    color: #fff;
    display: block;
    margin-right: 140px;
    text-decoration: none;
    transition: color 0.2s;
    border: 0;
    margin-left: auto;

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;

  form {
    align-items: center;
    align-self: center;
    max-width: 1120px;
    margin-bottom: 30px;
  }
`;

export const List = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;


export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Flavor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  button {
    max-width: 400px;
    margin-left: auto;
  }

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #ff9000;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50px;
    }

    strong {
      margin-left: 24px;
      color: #f4ede8;
      font-size: 20px;
    }
  }
`;

export const Counter = styled.div`
  margin-left: 24px;
  color: #f4ede8;
  font-size: 20px;
`

export const CounterFlex = styled.div`
  display: flex;
`