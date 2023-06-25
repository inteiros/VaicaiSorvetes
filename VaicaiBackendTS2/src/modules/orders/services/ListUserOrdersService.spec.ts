import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeOrderRepository from '../repositories/fakes/FakeOrdersRepository';
import ListUserOrdersServices from './ListUserOrdersService';

let fakeCacheProvider: FakeCacheProvider;
let listUserOrdersServices: ListUserOrdersServices;
let fakeOrderRepository: FakeOrderRepository;

describe('ListUserOrders', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeOrderRepository = new FakeOrderRepository();

        listUserOrdersServices = new ListUserOrdersServices(
            fakeOrderRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the orders from a user', async () => {
        const ord1 = await fakeOrderRepository.create({
            user_id: `123456`,
            provider_id: '12345678910',
            flavors: 'Morango',
            price: 3.00,
            name: 'Joao',
            username: 'Joao',
            payment: 'Cartao',
        });

        const ord2 = await fakeOrderRepository.create({
            user_id: `123456`,
            provider_id: '12345678910',
            flavors: 'Morango',
            price: 3.00,
            name: 'Joao',
            username: 'Joao',
            payment: 'Cartao',
        });

        const orders = await listUserOrdersServices.execute({
            user_id: `123456`,
        });

        expect(orders).toEqual([ord1, ord2]);
    });
});
