import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(fakeUserRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'Joao',
            email: 'joao@example.com',
            password: '123456',
            address: 'RJ',
            payment: 'Cartao',
            isProvider: false
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('Joao');
        expect(profile.email).toBe('joao@example.com');
    });

    it('should not be able to show the profile from a non-existing user', async () => {
        await expect(
            showProfile.execute({
                user_id: 'non-existing-user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
