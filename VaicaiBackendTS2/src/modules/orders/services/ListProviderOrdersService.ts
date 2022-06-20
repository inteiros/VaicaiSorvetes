import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
    provider_id: string;
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
        provider_id
    }: IRequest): Promise<Order[]> {
        //  const cacheKey = `provider-orders:${provider_id}`;

        //  let orders = await this.cacheProvider.recover<Order[]>(
        //      cacheKey,
        //  );
        let orders: Order[] = []

        orders = await this.ordersRepository.findAllFromProvider(
            provider_id
        );

        // if (!orders) {
        //     orders = await this.ordersRepository.findAllFromProvider(
        //         provider_id
        //     );

        //     // await this.cacheProvider.save(cacheKey, classToClass(orders));
        // }

        return orders;
    }
}

export default ListProviderOrdersServices;
