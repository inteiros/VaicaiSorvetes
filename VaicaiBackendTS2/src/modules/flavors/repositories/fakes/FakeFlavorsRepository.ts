import { ObjectID } from 'mongodb';

import IFlavorsRepository from '@modules/flavors/repositories/IFlavorsRepository';

import ICreateFlavorDTO from '@modules/flavors/dtos/ICreateFlavorDTO';

import Flavor from '@modules/flavors/infra/typeorm/entities/Flavor';

class FakeFlavorsRepository implements IFlavorsRepository {
    private flavors: Flavor[] = [];

    public async create({
        name,
        provider_id,
        price,
        pic
    }: ICreateFlavorDTO): Promise<Flavor> {
        const flavor = new Flavor();

        Object.assign(flavor, {
            id: new ObjectID(),
            name,
            provider_id,
            price,
            pic
        });

        this.flavors.push(flavor);

        return flavor;
    }

    public async findAllFlavorsByProviderId(provider_id: string): Promise<Flavor[] | null>{
        return this.flavors.filter(flavor => flavor.provider_id === provider_id);
    }

    public async findFlavorById(id: string): Promise<Flavor | undefined>{
        return this.flavors.find(flavor => flavor.id === id);
    }
}

export default FakeFlavorsRepository;
