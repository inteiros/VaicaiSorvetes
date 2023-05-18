import { uuid } from 'uuidv4';
import { v4 } from 'uuid';

import IOrdersRespository from '@modules/orders/repositories/IOrdersRepository';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import Order from '@modules/orders/infra/typeorm/entities/Order';

class OrdersRepository implements IOrdersRespository {
    private orders: Order[] = [];

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Order | undefined> {
        const findOrder = this.orders.find(
            order =>
                order.created_at === date && order.provider_id === provider_id
        );

        return findOrder;
    }

    public async findAllFromProvider(
        provider_id: string
    ): Promise<Order[]> {
        const orders = this.orders.filter(
            order =>
                order.provider_id === provider_id
        );

        return orders;
    }

    public async findFromUser(
        user_id: string
    ): Promise<Order[]> {
        const orders = this.orders.filter(
            order =>
                order.user_id === user_id
        );

        return orders;
    }

    public async create({
        provider_id,
        name,
        user_id,
        username,
        payment,
        flavors,
        price
    }: ICreateOrderDTO): Promise<Order> {
        const order = new Order();

        Object.assign(order, { provider_id, name, user_id, id: v4(), username, payment, flavors, price });

        this.orders.push(order);

        return order;
    }

    public async delete(order_id: string): Promise<void> {
        this.orders.splice(this.orders.findIndex(order => {
            return order.id === order_id;
        }), 1);
    }
}

export default OrdersRepository;
