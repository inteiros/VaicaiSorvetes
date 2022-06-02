import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  List,
  Section,
  Flavor,
} from './styles';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const Dashboard = () => {
  const { provider_id } = this.props.location.state
  const { signOut, user } = useAuth();
  const [flavors, setFlavors] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    api
      .get(`/flavors/list`, {
        body: provider_id,
      })
      .then((response) => {
        setFlavors(response.data);
      });
  }, [provider_id]);

  const handleCarrinho = useCallback(async(Id) => {
    setCarrinho([Id, ...rest]);
  });

  const calcPreco = () => {
    return carrinho.length() * 3; // to do
  }

  const handlePedido = useCallback(async() => {
    await api.post('/orders', provider_id, user.id, user.name, user.payment, flavors, calcPreco());
  });

  return (
    <>
      <Container>
        <Header>
          <HeaderContent>
            <img src={logoImg} alt="Vaicai" />

            <Profile>
              <img src={user.avatar_url} alt={user.name} />

              <div>
                <span>Bem-vindo,</span>
                <Link to="/profile">
                  <strong>{user.name}</strong>
                </Link>
              </div>
            </Profile>

            {user.isProvider === true && (
              <Link to="/sabores">
                <strong>Cadastrar sabores</strong>
              </Link>
            )}

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </HeaderContent>
        </Header>

        <Content>
          {user.isProvider === false && (
            <List>
            <Section>
              {flavors.length === 0 && (
                <p>Nenhum sorvete dessa loja disponivel no momento</p>
              )}

              {flavors.map((flavor) => (
                <Flavor onClick={handleCarrinho(flavor.id)} key={flavor.id}>
                  <div>
                    <img
                      src={flavor.pic}
                      alt={flavor.name}
                    />

                    <strong>{flavor.name}</strong>
                    <strong>{flavor.price}</strong>
                  </div>
                </Flavor>
              ))}
            </Section>
          </List>
          )}
        </Content>
        <Button onClick={handlePedido()} >Realizar compra</Button>
      </Container>
    </>
  );
};

export default Dashboard;
