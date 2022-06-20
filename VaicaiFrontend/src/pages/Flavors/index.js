import React, { useState, useCallback, useEffect } from 'react';

import { Link, useLocation, useHistory } from 'react-router-dom';
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
import { FiPower } from 'react-icons/fi';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const Dashboard = () => {
  const data = useLocation();
  const history = useHistory();
  const { signOut, user } = useAuth();
  const [flavors, setFlavors] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const provider_id = data.state.loja;
  const loja = provider_id;

  useEffect(() => {
    if(user){
      api
      .get(`/flavors/list`, {
        params: { provider_id: loja },
      })
      .then((response) => {
        setFlavors(response.data);
      });
    }
  }, [loja, user]);

  const handleCarrinho = useCallback(async(nomes) => {
    setCarrinho([nomes, ...carrinho]);
  }, [carrinho]);

  const flavorsname = () => {
    let str = "";
    str = carrinho.join(" 1x, ");
    return str
  }

  const calcPreco = () => {
    const price = carrinho.length * 3;
    return price
  }

  const price = String(calcPreco() + ",00");
  console.log(price);
  const flavorsnames = flavorsname();

  const handlePedido = async(provider_id, user, price) => {
    const name = "Order from " + user.name;
    console.log(provider_id, user.id, user.name, name, user.payment, flavorsnames, price)
    await api.post('/pedidos', { provider_id, user_id: user.id, name, username: user.name, payment: user.payment, flavors: flavorsnames, price });
    history.push("/");
  };

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
                <Flavor key={flavor.id}>
                  <div>
                    <img
                      src={flavor.pic}
                      alt={flavor.name}
                    />

                    <strong>{flavor.name}</strong>
                    <strong>R${flavor.price},00</strong>
                  </div>
                  <Button onClick={() => handleCarrinho(flavor.name)}> Adcionar sabor </Button>
                </Flavor>
              ))}
            </Section>
          </List>
          )}
        </Content>
        <Button onClick={() => handlePedido(provider_id, user, price)}> Realizar compra </Button>
      </Container>
    </>
  );
};

export default Dashboard;
