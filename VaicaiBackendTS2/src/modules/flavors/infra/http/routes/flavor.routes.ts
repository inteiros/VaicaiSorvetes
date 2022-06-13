import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FlavorController from '@modules/flavors/infra/http/controllers/FlavorController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const flavorRouter = Router();
const flavorController = new FlavorController();

flavorRouter.use(ensureAuthenticated);

flavorRouter.get('/list', flavorController.list);
flavorRouter.get('/listbyid', flavorController.listId);
flavorRouter.put(
    '/new',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.string().required(),
            pic: Joi.string(),
            provider_id: Joi.string().required(),
        },
    }),
    flavorController.create,
);

export default flavorRouter;