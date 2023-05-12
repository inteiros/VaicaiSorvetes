import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import DeleteOrderService from './DeleteOrderService';
import CreateOrderService from './CreateOrderService';
import ListProviderOrdersServices from './ListProviderOrdersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeOrdersRepository: FakeOrdersRepository;
let deleteOrder: DeleteOrderService;
let createOrder: CreateOrderService;
let listProviderOrdersServices: ListProviderOrdersServices;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('DeleteOrder', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeOrdersRepository = new FakeOrdersRepository();
        createOrder = new CreateOrderService(
            fakeOrdersRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
        deleteOrder = new DeleteOrderService(
            fakeOrdersRepository,
            fakeCacheProvider,
        );
        listProviderOrdersServices = new ListProviderOrdersServices(
            fakeOrdersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to delete an order', async () => {
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

        await deleteOrder.execute({ order_id: order.id })

        const orders = await listProviderOrdersServices.execute({
            provider_id: `12345678910`,
        });

        expect(orders).not.toContain(order);
    });
});
