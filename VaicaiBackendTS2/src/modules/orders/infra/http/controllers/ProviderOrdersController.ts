import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderOrdersService from '@modules/orders/services/ListProviderOrdersService';
import { classToClass } from 'class-transformer';

export default class ProviderOrdersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;

        const listOrders = container.resolve(
            ListProviderOrdersService,
        );

        const orders = await listOrders.execute({
            provider_id,
        });

        return response.json(classToClass(orders));
    }
}
