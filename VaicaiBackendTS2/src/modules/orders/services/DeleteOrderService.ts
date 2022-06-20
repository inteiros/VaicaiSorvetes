import { injectable, inject } from 'tsyringe';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    order_id: string;
    provider_id: string;
}

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(order_id 
    : string): Promise<void> {
        await this.ordersRepository.delete(order_id);
    }
}

export default CreateOrderService;
