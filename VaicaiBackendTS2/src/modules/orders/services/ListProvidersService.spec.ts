import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProfiles: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeUserRepository = new FakeUsersRepository();

        listProfiles = new ListProvidersService(
            fakeUserRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUserRepository.create({
            name: 'Vaicai',
            email: 'Vaicai@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: true
        });

        const user2 = await fakeUserRepository.create({
            name: 'Vaicai2',
            email: 'Vaicai2@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: true
        });

        const loggedUser = await fakeUserRepository.create({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        const providers = await listProfiles.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
