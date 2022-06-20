import { getRepository, Repository, Raw } from 'typeorm';

import IOrdersRespository from '@modules/orders/repositories/IOrdersRepository';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import Order from '@modules/orders/infra/typeorm/entities/Order';

class OrdersRepository implements IOrdersRespository {
    private ormRepository: Repository<Order>;

    constructor() {
        this.ormRepository = getRepository(Order);
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Order | undefined> {
        const findOrder = await this.ormRepository.findOne({
            where: { date, provider_id },
        });

        return findOrder;
    }

    public async findAllFromProvider(provider_id: string): Promise<Order[]> {
        const orders = await this.ormRepository.find({
            where: {
                provider_id,
            },
        });
        return orders;  
    } 

    public async findFromUser(user_id: string): Promise<Order[]> {
        const orders = await this.ormRepository.find({
            where: {
                user_id,
            }
        });
        return orders; 
    }

    public async create({
        provider_id,
        user_id,
        name,
        username,
        payment,
        flavors,
        price,
    }: ICreateOrderDTO): Promise<Order> {
        const order = this.ormRepository.create({
            provider_id,
            user_id,
            name,
            username,
            payment,
            flavors,
            price
        });

        await this.ormRepository.save(order);

        return order;
    }

    public async delete(order_id: string): Promise<void> {
        await this.ormRepository.delete({ id: order_id });
    }
}

export default OrdersRepository;
