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

import Button from '../../components/Button';

import { FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const Dashboard = () => {
  const { signOut, user } = useAuth();
  const [providers, setProviders] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(user.isProvider && user.id !== undefined){
      api
      .get(`/pedidos/loja/pedidos`, {
        params: { provider_id: user.id },
      })
      .then((response) => {
        setOrders(response.data);
      });
    } else {
      if(user.id !== undefined){
        api
      .get(`/providers`, {
        params: { user_id: user.id },
      })
      .then((response) => {
        setProviders(response.data);
      });
      }
    }
  }, [user.id, user.isProvider]);

  const handleDelete = async(order_id) => {
    await api.delete(`/pedidos/del/${order_id}`);
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderContent>
            <img src={logoImg} alt="Vaicai" />

            <Profile>
              <img src={user.avatar} alt={user.name} />

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
                  state: { loja: provider.id}
                }}>
                <Provider key={provider.id}>
                  <div>
                    <img
                      src={provider.avatar}
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
                    <strong>{order.flavors}</strong>
                    <strong>{order.payment}</strong>
                    <strong>{order.price}</strong>
                  </div>
                  <Button onClick={() => handleDelete(order.id)}> Pedido entregue </Button>
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
