import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfile from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfile(fakeUserRepository, fakeHashProvider);
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John',
            email: 'john@example.com',
        });

        expect(updatedUser.name).toBe('John');
        expect(updatedUser.email).toBe('john@example.com');
    });

    it('should not be able to update the profile from a non-existing user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existing-user_id',
                name: 'John',
                email: 'john@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUserRepository.create({
            name: 'Joao',
            email: 'joao2@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        const user = await fakeUserRepository.create({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Joao',
                email: 'joao2@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John',
            email: 'john@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without the old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Joao',
                email: 'john@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password without wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John',
                email: 'john@example.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
