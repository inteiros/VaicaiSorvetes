import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProviderOrdersServices {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        user_id
    }: IRequest): Promise<Order[]> {
        const cacheKey = `provider-orders:${user_id}`;

        let orders = await this.cacheProvider.recover<Order[]>(
            cacheKey,
        );

        if (!orders) {
            orders = await this.ordersRepository.findFromUser(
                user_id
            );

            await this.cacheProvider.save(cacheKey, classToClass(orders));
        }

        return orders;
    }
}

export default ListProviderOrdersServices;
