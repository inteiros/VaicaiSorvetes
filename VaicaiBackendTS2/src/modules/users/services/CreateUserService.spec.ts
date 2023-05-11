import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        expect(user).toHaveProperty('id');
    });

    it('should be able to create a new store type user', async () => {
        const user = await createUser.execute({
            name: 'Sorvetes',
            email: 'sorvas@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: true
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with an email that has already been used', async () => {
        await createUser.execute({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        await expect(
            createUser.execute({
                name: 'Joao',
                email: 'joao@example.com',
                password: '123456',
                address: 'RJ',
                payment: 'Cartao',
                isProvider: false
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
