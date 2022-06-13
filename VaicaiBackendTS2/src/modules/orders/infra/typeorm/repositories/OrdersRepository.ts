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
        username,
        payment,
        flavors_id,
        price,
    }: ICreateOrderDTO): Promise<Order> {
        const order = this.ormRepository.create({
            provider_id,
            user_id,
            username,
            payment,
            flavors_id,
            price
        });

        await this.ormRepository.save(order);

        return order;
    }

    public async delete(user_id: string): Promise<void> {
        const order = await this.ormRepository.find({
            where: user_id
        });

        await this.ormRepository.remove(order);
    }
}

export default OrdersRepository;
