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
  Counter,
  CounterFlex
} from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const FlavorsPage = () => {
  const data = useLocation();
  const history = useHistory();
  const { user } = useAuth();
  const [flavors, setFlavors] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [counter, setCounter] = useState([]);

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

  const handleCarrinho = useCallback(async(flavor) => {
    setCarrinho((prevCarrinho) => [flavor, ...prevCarrinho]);
  }, []);

  const limparCarrinho = () => {
    setCarrinho([]);
    setCounter([]);
  };

  const calcPreco = () => {
    const totalPrice = carrinho.reduce((accumulator, flavor) => {
      return accumulator + flavor.price;
    }, 0);

    return totalPrice;
  }

  useEffect(() => {
    const flavorCounts = carrinho.reduce((counts, flavor) => {
      const { id } = flavor;
      const foundFlavor = flavors.find((flavor) => flavor.id === id);

      if (foundFlavor) {
        const { name } = foundFlavor;
        const key = name;

        if (counts.hasOwnProperty(key)) {
          counts[key]++;
        } else {
          counts[key] = 1;
        }
      }

      return counts;
    }, {});

    const flavorStrings = Object.entries(flavorCounts).map(([name, count]) => {
      return `${count}x ${name}`;
    });

    const resultString = flavorStrings.join(', ');

    setCounter(resultString);
  }, [carrinho, flavors]);

  const handlePedido = async(provider_id, user) => {
    const price = calcPreco();
    const name = "Endereço: " + user.address;
    console.log(provider_id, user.id, user.name, name, user.payment, counter, price)
    await api.post('/pedidos', { provider_id, user_id: user.id, name, username: user.name, payment: user.payment, flavors: counter, price });
    history.push("/");
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderContent>
            <img src={logoImg} alt="Vaicai" />

            <Profile>
            <img src={user.avatar}
              alt={""} />

              <div>
                <span>Bem-vindo,</span>
                <Link to="/profile">
                  <strong>{user.name}</strong>
                </Link>
              </div>
            </Profile>
            <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
          </HeaderContent>
        </Header>

        <Content>
          {user.isProvider === false && (
            <List>
            <Section>
              {flavors.length === 0 && (
                <p>Nenhum sorvete dessa loja disponivel no momento</p>
              )}

              <CounterFlex>
                <Counter>{counter}</Counter>
                {counter.length !== 0 && (<Button onClick={() => limparCarrinho()}>Limpar Carrinho</Button>)}
              </CounterFlex>
              
              {flavors.map((flavor) => (
                <Flavor key={flavor.id}>
                  <div>
                    <img
                      src={flavor.pic}
                      alt={flavor.name}
                    />

                    <strong>{flavor.name}</strong>
                    <strong>R${parseFloat(flavor.price).toFixed(2)}</strong>

                    <Button onClick={() => handleCarrinho(flavor)}> Adcionar sabor </Button>
                  </div>
                </Flavor>
              ))}
            </Section>
          </List>
          )}
          {user.isProvider === true && (
            <List>
            <Section>
              {flavors.length === 0 && (
                <p>Nenhum sorvete cadastrado.</p>
              )}
              
              {flavors.map((flavor) => (
                <Flavor key={flavor.id}>
                  <div>
                    <img
                      src={flavor.pic}
                      alt={flavor.name}
                    />

                    <strong>{flavor.name}</strong>
                    <strong>R${parseFloat(flavor.price).toFixed(2)}</strong>
                  </div>
                </Flavor>
              ))}
            </Section>
          </List>
          )}
        </Content>
        {user.isProvider === false && (<Button onClick={() => handlePedido(provider_id, user)}> Realizar compra </Button>)}
      </Container>
    </>
  );
};

export default FlavorsPage;
