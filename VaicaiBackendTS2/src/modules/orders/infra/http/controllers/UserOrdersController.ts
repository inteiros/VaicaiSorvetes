import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserOrdersService from '@modules/orders/services/ListUserOrdersService';
import { classToClass } from 'class-transformer';

export default class UserOrdersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;

        const listOrders = container.resolve(
            ListUserOrdersService,
        );

        const orders = await listOrders.execute({
            user_id,
        });

        return response.json(classToClass(orders));
    }
}
