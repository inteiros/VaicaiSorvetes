import { getRepository, Repository, Not } from 'typeorm';

import IUsersRespository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRespository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async findProviderById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { id, isProvider: true },
        });

        return user;
    }

    public async findAllProviders(): Promise<User[] | null> {
        let users: User[];

        users = await this.ormRepository.find({
            where: {
                isProvider: true,
            },
        });

        return users;
    }

    public async create({
        name,
        email,
        password,
        address,
        payment,
        isProvider
    }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
            address,
            payment,
            isProvider
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
