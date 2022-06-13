import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    provider_id: string;
    user_id: string;
    username: string;
    payment: string;
    flavors_id: string[];
    price: string;
}

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        user_id,
        username,
        payment,
        flavors_id,
        price
    }: IRequest): Promise<Order> {
        if (user_id === provider_id) {
            throw new AppError("You can't place an order in your own store");
        }

        const order = await this.ordersRepository.create({
            provider_id,
            user_id,
            username,
            payment,
            flavors_id,
            price
        });

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para ${Date.now()}`,
        });

        return order;
    }
}

export default CreateOrderService;
