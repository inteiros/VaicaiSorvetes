import { Router } from 'express';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import flavorsRouter from '@modules/flavors/infra/http/routes/flavor.routes';
import providersRouter from '@modules/orders/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import lojaRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/pedidos', ordersRouter);
routes.use('/flavors', flavorsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/loja', lojaRouter);

export default routes;
