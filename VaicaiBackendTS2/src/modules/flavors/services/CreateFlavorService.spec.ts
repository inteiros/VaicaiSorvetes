import FakeFlavorsRepository from '@modules/flavors/repositories/fakes/FakeFlavorsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateFlavorService from './CreateFlavorService';

let fakeCacheProvider: FakeCacheProvider;
let fakeFlavorsRepository: FakeFlavorsRepository;
let createFlavor: CreateFlavorService;

describe('CreateFlavor', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeFlavorsRepository = new FakeFlavorsRepository();
        createFlavor = new CreateFlavorService(
            fakeFlavorsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new flavor', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const order = await createFlavor.execute({
            provider_id: `12345678910`,
            name: 'Morango',
            price: 3.00,
            pic: 'foto.png'
        });

        expect(order).toHaveProperty('provider_id');
        expect(order.provider_id).toBe(`12345678910`);
    });
});
