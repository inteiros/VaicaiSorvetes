import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

//import api from '../../services/api';

import { Container, Content, Text, Title, ButtonContainer, TitleBox, Selection } from './styles';

const Personalizar = () => {
  const location = useLocation();
  console.log(location.state)

  const [custom, setCustom] = useState('');

  const history = useHistory();

  const handleCustom = useCallback((custom) => {
    if(document.querySelector('.selected')){
      document.querySelector('.selected').removeAttribute('class');
    }
    setCustom(custom);
    const btn = document.getElementById(custom);
    if(btn.getAttribute("class")){
      btn.removeAttribute("class");
    } else{
      btn.setAttribute("class", 'selected');
    }
  }, []);

  const data ={
    acai: location.state,
    custom: custom
  }

  return(
    <>
      <Container>
        <Content>
          <TitleBox>
            <Title>Personalize seu açaí</Title>
          </TitleBox>

          <Selection>
            <Text>PERSONALIZAÇÃO:</Text>
              <ButtonContainer>
                <button type='button' onClick={() => {handleCustom('Granola')}} id="Granola" >Granola</button>
                <button type='button' onClick={() => {handleCustom('Paçoca')}} id="Paçoca" >Paçoca</button>
                <button type='button' onClick={() => {handleCustom('Leite ninho')}} id="Leite ninho" >Leite ninho</button>
              </ButtonContainer>
          </Selection>

          <button type='button' className="next" onClick={() => history.push({
  pathname: '/finalizar',
  search: '?data',
  state: data,
}) }>Finalizar pedido</button>
        </Content>
      </Container>
    </>
  );
};

export default Personalizar;
