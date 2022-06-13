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
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUserRepository.create({
            name: 'John Trê',
            email: 'johntre@example.com',
            password: '123456',
        });

        const loggedUser = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const providers = await listProfiles.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });

    // it('should not be able to show the profile from a non-existing user', async () => {
    //     await expect(
    //         listProfiles.execute({
    //             user_id: 'non-existing-user_id',
    //         }),
    //     ).rejects.toBeInstanceOf(AppError);
    // });
});
