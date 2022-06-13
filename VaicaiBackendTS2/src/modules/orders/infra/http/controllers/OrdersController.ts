import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';

export default class OrdersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, flavors_id, price } = request.body;

        const createOrder = container.resolve(CreateOrderService);

        const order = await createOrder.execute({
            provider_id,
            user_id,
            flavors_id,
            price
        });

        return response.json(order);
    }
}
