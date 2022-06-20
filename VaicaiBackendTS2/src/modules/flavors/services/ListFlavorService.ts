import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Flavor from '@modules/flavors/infra/typeorm/entities/Flavor';
import IFlavorsRepository from '@modules/flavors/repositories/IFlavorsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    provider_id: string;
}

interface IRequest2 {
    id: string;
}

@injectable()
class ListFlavorServices {
    constructor(
        @inject('FlavorsRepository')
        private flavorsRepository: IFlavorsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(provider_id: string): Promise<Flavor[] | null> {
        let flavors = await this.cacheProvider.recover<Flavor[]>(
            `flavors-list:${provider_id}`,
        );

        if (!flavors) {
            flavors = await this.flavorsRepository.findAllFlavorsByProviderId(provider_id);

            await this.cacheProvider.save(
                `providers-list:${provider_id}`,
                classToClass(flavors),
            );
        }

        return flavors;
    }
    public async listOne({ id }: IRequest2): Promise<Flavor | undefined> {
        const flavor = await this.flavorsRepository.findFlavorById(id);

        return flavor;
    }
}

export default ListFlavorServices;
