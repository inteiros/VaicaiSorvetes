import React, { useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
} from './styles';
import logoImg from '../../assets/logo.png';
import { FiAlertCircle, FiCamera, FiDollarSign, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';


const Dashboard = () => {
  const { signOut, user } = useAuth();
  const formRef = useRef(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do sabor obrigatório'),
          price: Yup.string(),
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
  
              <Input name="name" icon={FiAlertCircle} placeholder="Nome do sabor" />
              <Input name="price" icon={FiDollarSign} placeholder="Preço" />
              <Input name="pic" icon={FiCamera} placeholder="Foto" />
              <Button type="submit">Cadastrar sabor</Button>
            </Form>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
