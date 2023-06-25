import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrdersController from '@modules/orders/infra/http/controllers/OrdersController';
import ProviderOrdersController from '@modules/orders/infra/http/controllers/ProviderOrdersController';
import UserOrdersController from '@modules/orders/infra/http/controllers/UserOrdersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const ordersRouter = Router();

const ordersController = new OrdersController();
const providerOrdersController = new ProviderOrdersController();
const userOrdersController = new UserOrdersController();

//ordersRouter.use(ensureAuthenticated);

ordersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            user_id: Joi.string().uuid().required(),
            name: Joi.string().required(),
            username: Joi.string().required(),
            payment: Joi.string().required(),
            flavors: Joi.string().required(),
            price: Joi.number().required(),
        },
    }),
    ordersController.create,
);
ordersRouter.get('/loja/pedidos', providerOrdersController.index);
ordersRouter.get('/pedidos', userOrdersController.index);

ordersRouter.delete('/del/:order_id', celebrate({
    [Segments.PARAMS]: {
        order_id: Joi.string().uuid().required(),
    },
    }), ordersController.delete);


export default ordersRouter;
