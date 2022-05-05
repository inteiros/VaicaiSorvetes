import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

//import api from '../../services/api';

import { Container, Content, Text, Title, ButtonContainer, TitleBox, Selection } from './styles';

const Escolha = () => {
  const [sabor, setSabor] = useState('');
  const [tamanho, setTamanho] = useState('');

  const history = useHistory();

  const handleSabor = useCallback((sabor) => {
    if(document.querySelector('.selected')){
      document.querySelector('.selected').removeAttribute('class');
    }
    setSabor(sabor);
    const btn = document.getElementById(sabor);
    if(btn.getAttribute("class")){
      btn.removeAttribute("class");
    } else{
      btn.setAttribute("class", 'selected');
    }
  }, []);

  const handleTamanho = useCallback((tamanho) => {
    if(document.querySelector('.selectedt')){
      document.querySelector('.selectedt').removeAttribute('class');
    }
    setTamanho(tamanho);
    const btn = document.getElementById(tamanho);
    if(btn.getAttribute("class")){
      btn.removeAttribute("class");
    } else{
      btn.setAttribute("class", 'selectedt');
    }
  }, []);

  return(
    <>
      <Container>
        <Content>
          <TitleBox>
            <Title>Escolha seu açaí</Title>
          </TitleBox>

          <Selection>
            <Text>SABOR:</Text>
              <ButtonContainer>
                <button type='button' onClick={() => {handleSabor('Morango')}} id="Morango" >Morango</button>
                <button type='button' onClick={() => {handleSabor('Banana')}} id="Banana" >Banana</button>
                <button type='button' onClick={() => {handleSabor('Kiwi')}} id="Kiwi" >Kiwi</button>
              </ButtonContainer>
          </Selection>

          <Selection>
            <Text>TAMANHO:</Text>
            <ButtonContainer>
              <button type='button' onClick={() => handleTamanho('Pequeno')} id="Pequeno" >Pequeno (300ml)</button>
              <button type='button' onClick={() => handleTamanho('Medio')} id="Medio" >Médio (500ml)</button>
              <button type='button' onClick={() => handleTamanho('Grande')} id="Grande" >Grande (700ml)</button>
            </ButtonContainer>
          </Selection>

          <button type='button' className="next" onClick={() => history.push("/personalizar", { sabor: sabor, tamanho: tamanho})}>Avançar</button>
        </Content>
      </Container>
    </>
  );
};

export default Escolha;
