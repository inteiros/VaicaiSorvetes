import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
} from './styles';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';


const Dashboard = () => {
  const { signOut, user } = useAuth();
  const formRef = useRef(null);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do sabor obrigatório'),
          price: Yup.double(),
          pic: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/flavors/new', data);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [history],
  );

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
              <Link to="/">
                <strong>Voltar a pagina inicial</strong>
              </Link>
            )}

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </HeaderContent>
        </Header>

        <Content>
          {user.isProvider === true && (
              <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Cadastre o sabor</h1>
  
              <Input name="name" placeholder="Nome do sabor" />
              <Input name="price" placeholder="price" />
              <Input name="pic" placeholder="Foto" />
              <Button type="submit">Cadastrar sabor</Button>
            </Form>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
