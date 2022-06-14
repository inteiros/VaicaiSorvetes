import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  List,
  Section,
  Provider,
  Orders,
} from './styles';

import { FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const Dashboard = () => {
  const { signOut, user } = useAuth();
  const [providers, setProviders] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(user.isProvider){
      api
      .get(`/loja/pedidos`, {
        params: user.id,
      })
      .then((response) => {
        setOrders(response.data);
      });
    } else {
      api
      .get(`/providers`, {
        params: user.id,
      })
      .then((response) => {
        setProviders(response.data);
      });
    }
  }, [user.id, user.isProvider]);

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
              <Link to="/flavoradd">
                <span>Cadastrar sabores</span>
              </Link>
            )}

            <button type="button" onClick={signOut} >
              <FiPower />
            </button>
          </HeaderContent>
        </Header>

        <Content>
          {user.isProvider === false && (
            <List>
            <Section>
              {providers.length === 0 && (
                <p>Nenhuma loja aberta no momento</p>
              )}

              {providers.map((provider) => (
                <Link to={{
                  pathname: "/flavors",
                  state: provider.id
                }}>
                <Provider key={provider.id}>
                  <div>
                    <img
                      src={provider.avatar_url}
                      alt={provider.name}
                    />

                    <strong>{provider.name}</strong>
                  </div>
                </Provider>
                </Link>
              ))}
            </Section>
          </List>
          )}

          {user.isProvider === true && (
            <List>
            <Section>
              {orders.length === 0 && (
                <p>Nenhum pedido pendente no momento</p>
              )}

              {orders.map((order) => (
                <Orders key={order.id}>
                  <div>
                    <strong>{order.username}</strong>
                    <strong>{order.payment}</strong>
                    <strong>{order.price}</strong>
                  </div>
                </Orders>
              ))}
            </Section>
          </List>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
