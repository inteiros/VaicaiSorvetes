import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFlavorService from '@modules/flavors/services/CreateFlavorService';
import ListFlavorService from '@modules/flavors/services/ListFlavorService';

export default class FlavorsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, pic, provider_id } = request.body;

        const createFlavor = container.resolve(CreateFlavorService);

        const flavor = await createFlavor.execute({
            name,
            pic,
            price,
            provider_id
        });

        return response.json(classToClass(flavor));
    }

    public async list(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.body;
        const listFlavors = container.resolve(ListFlavorService);

        const flavors = await listFlavors.execute(provider_id);

        return response.json(classToClass(flavors));
    }

    public async listId(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.body;
        const listFlavor = container.resolve(ListFlavorService);

        const flavor = await listFlavor.listOne(id);

        return response.json(classToClass(flavor));
    }
}
