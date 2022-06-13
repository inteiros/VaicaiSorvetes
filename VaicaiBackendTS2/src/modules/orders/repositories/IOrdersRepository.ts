import Order from '@modules/orders/infra/typeorm/entities/Order';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

export default interface IOrdersRepository {
    create(data: ICreateOrderDTO): Promise<Order>;
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Order | undefined>;
    findAllFromProvider(provider_id: string): Promise<Order[]>;
    findFromUser(user_id: string): Promise<Order[]>;
    delete(user_id: string): Promise<void>;
}
