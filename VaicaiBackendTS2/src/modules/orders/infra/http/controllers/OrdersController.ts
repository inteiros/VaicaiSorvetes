import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';

export default class OrdersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, user_id, name, username, payment, flavors, price } = request.body;

        const createOrder = container.resolve(CreateOrderService);

        const order = await createOrder.execute({
            provider_id,
            user_id,
            name,
            flavors,
            price,
            payment,
            username
        });

        return response.json(order);
    }

    public async delete(request: Request,
        response: Response,
    ): Promise<void> {
        const { order_id } = request.params;

        const order = String(order_id)

        const deleteOrder = container.resolve(DeleteOrderService);

        await deleteOrder.execute(order);
    }
}
