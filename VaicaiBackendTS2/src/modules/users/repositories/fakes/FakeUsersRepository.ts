import { uuid } from 'uuidv4';

import IUsersRespository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRespository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    public async findProviderById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id && user.isProvider === true);

        return findUser;
    }

    public async findAllProviders(): Promise<User[] | undefined> {
        return this.users.filter(user => user.isProvider === true);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;
