import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Flavor from '@modules/flavors/infra/typeorm/entities/Flavor';
import IFlavorsRepository from '@modules/flavors/repositories/IFlavorsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    name: string;
    price: number;
    provider_id: string;
    pic: string;
}

@injectable()
class CreateFlavorService {
    constructor(
        @inject('FlavorsRepository')
        private flavorsRepository: IFlavorsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ name, price, provider_id, pic }: IRequest): Promise<Flavor> {
        const flavor = await this.flavorsRepository.create({
            name,
            price,
            pic,
            provider_id
        });

        await this.cacheProvider.invalidatePrefix('flavor-list');

        return flavor;
    }
}

export default CreateFlavorService;
