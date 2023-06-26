import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft, FiDollarSign, FiHome } from 'react-icons/fi';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import { Container, Content, AnimationContainer, Background } from './styles';
import CheckBoxInput from "../../components/CheckboxInput";

const SignUp = () => {
  const formRef = useRef(null);

  const checkboxOptions = [{ id: "isProvider", value: true, label: "Loja" }];

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Minimo de 6 digitos'),
          address: Yup.string(),
          payment: Yup.string(),
          avatar: Yup.string(),
          isProvider: Yup.boolean()
        });

        data.isProvider = data.isProvider[0];
        if(!data.isProvider){
          data.isProvider = false;
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);

        await api.post('/users', data);

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
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Vaicai" />

          <Form ref={formRef} onSubmit={handleSubmit} initialData={{ isProvider: false }}>
            <h1>Crie sua conta</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input name="address" icon={FiHome} placeholder="Endereço" />
            <Input name="payment" icon={FiDollarSign} placeholder="Pagamento" />
            <Input name="avatar" icon={FiCamera} placeholder="Foto de perfil" />
            <CheckBoxInput name="isProvider" options={checkboxOptions} />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
