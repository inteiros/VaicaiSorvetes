import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import ListProviderOrdersServices from './ListProviderOrdersService';

let fakeCacheProvider: FakeCacheProvider;
let listProviderOrdersServices: ListProviderOrdersServices;
let fakeOrdersRepository: FakeOrdersRepository;

describe('ListProviderOrders', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeOrdersRepository = new FakeOrdersRepository();

        listProviderOrdersServices = new ListProviderOrdersServices(
            fakeOrdersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the orders from a provider', async () => {
        const ord1 = await fakeOrdersRepository.create({
            user_id: '12345678910',
            provider_id: `123456`,
            flavors: 'Morango',
            price: 'R$3,00',
            name: 'Joao',
            username: 'Joao',
            payment: 'Cartao',
        });

        const ord2 = await fakeOrdersRepository.create({
            user_id: '12345678910',
            provider_id: `123456`,
            flavors: 'Morango',
            price: 'R$3,00',
            name: 'Joao',
            username: 'Joao',
            payment: 'Cartao',
        });

        const orders = await listProviderOrdersServices.execute({
            provider_id: `123456`,
        });

        expect(orders).toEqual([ord1, ord2]);
    });
});
