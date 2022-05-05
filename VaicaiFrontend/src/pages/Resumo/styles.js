import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  place-content: center;
  justify-content: center;
  a {
    margin-left: 800px;
    margin-top: -20px;
    text-decoration: none;
    color: #7b1fa2;
    transition: color 0.2s;
  }

  .final1{
    margin-bottom: 0px;
  }
  .final2{
    margin-top: 0px;
    margin-bottom: 20px;
  }

  button {
    margin:15px 0;
    width: 155px;
    height: 40px;
    font-size: 14px;
    background: #fff;
    border-radius: 5px;
    border: 2px solid #999;
    outline:none;
    -webkit-font-smoothing: antialiased;
    color: #999999;
    font-weight: 400;

    &:hover {
    background-color: #999;
    color: #fff;
    font-weight: 400;
    }
  }

  .selected{
      background-color: #999;
      color: #fff;
    }

  .selectedt{
      background-color: #999;
      color: #fff;
    }

  .next{
    align-self: flex-end;
    margin-bottom: 5px;
    margin-top: 10px;
    width: 110px;
    margin-right: 15px;
    height: 35px;
    font-size: 14px;
    background: #fff;
    border-radius: 5px;
    border: 2px solid #4a148c;
    outline:none;
    -webkit-font-smoothing: antialiased;
    color: #4a148c;
    font-weight: 600;

    &:hover {
    background-color: #4a148c;
    color: #fff;
    font-weight: 400;
  }
  }
`;

export const Content = styled.div`
  display: flex;
  box-shadow: 1px 1px 5px 2px;
  border-radius: 5px;
  background-color: #fff;
  flex-direction: column;
  a {
    margin-left: 800px;
    margin-top: -200px;
    text-decoration: none;
    color: #7b1fa2;
  }
  width: 100%;
  max-width: 550px;
  height: 100%;
  max-height: 400px;
  margin-bottom: -50px;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 10px;

  div{
    font-size: 12px;
    font-weight: 400;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 20px;
  }
`;

export const Text = styled.h1`
  color: #4a148c;
  margin-top: 10px;
  margin-left: 20px;
  display: flex;
  align-items: flex-start;
  place-content: initial;
  justify-content: flex-start;
  font-size: 13px;
  font-weight: 600;
`;

export const Title = styled.h1`
  color: #4a148c;
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  place-content: center;
  justify-content: center;
`;

export const TitleBox = styled.div`
  flex-direction: row;

  align-content: flex-start;
  justify-content: left;
  align-items: flex-start;
`;

export const Selection = styled.div`
  justify-content: center;
`;

