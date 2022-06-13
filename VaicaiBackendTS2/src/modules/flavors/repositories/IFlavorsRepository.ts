import ICreateFlavorDTO from '../dtos/ICreateFlavorDTO';
import Flavor from '../infra/typeorm/entities/Flavor';

export default interface IFlavorsRepository {
    create(data: ICreateFlavorDTO): Promise<Flavor>;
    findAllFlavorsByProviderId(provider_id: string): Promise<Flavor[] | null>;
    findFlavorById(id: string): Promise<Flavor | undefined>;
}
