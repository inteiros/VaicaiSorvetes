import FakeFlavorsRepository from '@modules/flavors/repositories/fakes/FakeFlavorsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListFlavorService from './ListFlavorService';
import CreateFlavorService from './CreateFlavorService';

let fakeCacheProvider: FakeCacheProvider;
let fakeFlavorsRepository: FakeFlavorsRepository;
let listFlavor: ListFlavorService;
let createFlavor: CreateFlavorService;

describe('ListFlavors', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeFlavorsRepository = new FakeFlavorsRepository();
        createFlavor = new CreateFlavorService(
            fakeFlavorsRepository,
            fakeCacheProvider,
        );
        listFlavor = new ListFlavorService(
            fakeFlavorsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list flavors', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const order = await createFlavor.execute({
            provider_id: `12345678910`,
            name: 'Morango',
            price: 'R$3,00',
            pic: 'foto.png'
        });

        const order2 = await createFlavor.execute({
            provider_id: `12345678910`,
            name: 'Chocolate',
            price: 'R$3,00',
            pic: 'foto.png'
        });

        const orders = await listFlavor.execute(`12345678910`);

        expect(orders).toEqual([order, order2]);
    });

    it('should be able to return one flavor by id', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const order = await createFlavor.execute({
            provider_id: `12345678910`,
            name: 'Morango',
            price: 'R$3,00',
            pic: 'foto.png'
        });

        const order2 = await createFlavor.execute({
            provider_id: `12345678910`,
            name: 'Chocolate',
            price: 'R$3,00',
            pic: 'foto.png'
        });

        const orders = await listFlavor.listOne({ id: order.id });

        expect(orders).toEqual(order);
        expect(orders).not.toContain(order2);
    });
});
