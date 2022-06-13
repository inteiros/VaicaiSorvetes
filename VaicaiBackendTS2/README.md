# Painel do cliente

**Requisitos Funcionais**

- O usuário deve poder visualizar as lojas cadastradas;
- O usuário deve poder selecionar uma das lojas disponíveis e listar os sabores;
- O usuário deve poder selecionar sabores para prosseguir com o pedido;

**Requisitos Não Funcionais**

- Listar as lojas cadastradas nos bancos de dados (MySQL/PostgreSQL);
- Listar os sabores cadastrados por determinada loja selecionada previamente;

**Regras de Negócio**

- Lojas devem ser listadas apenas se possuirem sabores cadastrados;
- Apenas usuários podem realizar pedidos;

# Criação de perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha.

**RNF**

- Os usuários cadastrados pelo sistema devem ser armazenados em um banco de dados relacional (MySQL/PostgreSQL);

**RN**

- O usuário não pode alterar seu e-mail para outro já utilizado;
- Para atualizar sua senha, o usuário precisa informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar sua nova senha;

# Painel da loja

**RF**

- A loja deve poder cadastrar um novo sabor;
- A loja deve poder listar os pedidos realizados até o momento;
- A loja deve receber uma notificação sempre que houver um novo pedido;
- A loja deve poder visualizar as notificações nao lidas;

**RNF**

- Os sabores cadastrados pela loja devem ser armazenados em um banco de dados relacional (MySQL/PostgreSQL);
- As notificações da loja devem ser armazenados no MongoDB;
- As notificações da loja devem ser enviadas em tempo-real utilizando o Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que a loja possa controlar;
- Os dados do cliente que realizou o pedido devem estar disponíveis somente para a loja cujo produto foi comprado;
- Os sabores cadastrados devem possuir imagens ilustrativas;

# Realização de pedidos

**RF**

- O usuário deve poder realizar multiplos pedidos;
- A loja deve ser capaz de alterar o status dos pedidos;
- O usuário deve ser capaz de visualizar o status do seu pedido;

**RNF**

- A listagem de pedidos deve ser armazenada em um banco de dados relacional (MySQL/PostgreSQL);

**RN**

- Pedidos de status "entregue" não deverão ser listados como pendentes;
- O usuário não pode alterar seu pedido depois de realizado;
- O usuário não pode incluir sabores não cadastrados em seu pedido;
- O preço total do pedido deverá ser calculado automaticamente com base nos sabores selecionados;
- O pedido deverá estar disponível apenas para a loja em que o cliente realizou a compra;
