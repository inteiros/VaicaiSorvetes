import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateOrderService from './CreateOrderService';

let fakeCacheProvider: FakeCacheProvider;
let fakeOrdersRepository: FakeOrdersRepository;
let createOrder: CreateOrderService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateOrder', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeOrdersRepository = new FakeOrdersRepository();
        createOrder = new CreateOrderService(
            fakeOrdersRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new order', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const order = await createOrder.execute({
            user_id: '123456',
            provider_id: `12345678910`,
            flavors: 'Morango',
            price: 'R$3,00',
            name: 'Joao',
            username: 'Joao',
            payment: 'Cartao',
        });

        expect(order).toHaveProperty('id');
        expect(order.provider_id).toBe(`12345678910`);
    });

    it('should not be able to create an order with same user as provider', async () => {
        await expect(
            createOrder.execute({
                user_id: '123456',
                provider_id: `123456`,
                flavors: 'Morango',
                price: 'R$3,00',
                name: 'Joao',
                username: 'Joao',
                payment: 'Cartao',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
