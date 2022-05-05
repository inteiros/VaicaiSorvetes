import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

//import api from '../../services/api';

import { Container, Content, Text, Title, TextContainer, TitleBox, Selection } from './styles';

const Escolha = () => {
  const location = useLocation();
  console.log(location.state)

  const pedido = location.state;

  const history = useHistory();

  return(
    <>
      <Container>
        <Content>
          <TitleBox>
            <Title>Resumo do pedido</Title>
          </TitleBox>

          <Selection>
            <Text>TAMANHO:</Text>
              <TextContainer>
                <div> - {pedido.acai.tamanho === 'Medio' ? "Médio (500ml)" : (pedido.acai.tamanho === 'Pequeno' ? "Pequeno (300ml)" : (pedido.acai.tamanho === 'Grande' ? "Grande (700ml)" : ''))}</div>
                <div> R$ {pedido.acai.tamanho === 'Medio' ? "12" : (pedido.acai.tamanho === 'Pequeno' ? "10" : (pedido.acai.tamanho === 'Grande' ? "15" : ''))}.00</div>
              </TextContainer>
          </Selection>

          <Selection>
            <Text>SABOR:</Text>
            <TextContainer>
              <div> - {pedido.acai.sabor}</div>
              <div> R$ 0.00</div>
            </TextContainer>
          </Selection>

          {pedido.custom && (
            <Selection>
              <Text>PERSONALIZAÇÕES:</Text>
              <TextContainer>
                <div> - {pedido.custom}</div>
                <div> R$ 3.00 </div>
              </TextContainer>
            </Selection>
          )}

            <Selection>
              <Text className="final1">Valor total: R$ {pedido.acai.tamanho === 'Medio' ? 12 : (pedido.acai.tamanho === 'Pequeno' ? 10 : (pedido.acai.tamanho === 'Grande' ? 15 : '')) + (pedido.custom ? 3 : 0)}.00 </Text>
            </Selection>
            <Selection>
              <Text className="final2">Tempo de preparo: {pedido.acai.tamanho === 'Medio' ? 7 : (pedido.acai.tamanho === 'Pequeno' ? 5 : (pedido.acai.tamanho === 'Grande' ? 9 : ''))}min </Text>
            </Selection>
          <button type='button' className="next" onClick={() => history.push("/")}>Refazer pedido</button>
        </Content>
      </Container>
    </>
  );
};

export default Escolha;
