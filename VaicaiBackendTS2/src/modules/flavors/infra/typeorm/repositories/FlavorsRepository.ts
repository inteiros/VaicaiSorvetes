import { getRepository, Repository } from 'typeorm';

import IFlavorsRepository from '@modules/flavors/repositories/IFlavorsRepository';

import ICreateFlavorDTO from '@modules/flavors/dtos/ICreateFlavorDTO';

import Flavor from '@modules/flavors/infra/typeorm/entities/Flavor';

class flavorsRepository implements IFlavorsRepository {
    private ormRepository: Repository<Flavor>;

    constructor() {
        this.ormRepository = getRepository(Flavor);
    }

    public async create({
        name,
        provider_id,
        price,
        pic
    }: ICreateFlavorDTO): Promise<Flavor> {
        const flavor = this.ormRepository.create({
            name,
            provider_id,
            price,
            pic
        });

        await this.ormRepository.save(flavor);

        return flavor;
    }
    
    public async findAllFlavorsByProviderId(provider_id: string): Promise<Flavor[] | null> {
        let flavors: Flavor[];

        flavors = await this.ormRepository.find({
            where: {
                provider_id,
            },
        });

        return flavors;
    }

    public async findFlavorById(id: string): Promise<Flavor | undefined> {
        const flavor = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return flavor;
    }

    public async save(flavor: Flavor): Promise<Flavor> {
        return this.ormRepository.save(flavor);
    }

    public async delete(flavor: Flavor): Promise<void> {
        this.ormRepository.delete(flavor);
    }
}

export default flavorsRepository;
