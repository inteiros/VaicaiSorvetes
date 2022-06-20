import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/orders/services/ListProvidersService';

export default class ProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id } = request.query;

        const listProviders = container.resolve(ListProvidersService);

        const providers = await listProviders.execute({
            user_id: String(user_id),
        });

        return response.json(classToClass(providers));
    }
}
