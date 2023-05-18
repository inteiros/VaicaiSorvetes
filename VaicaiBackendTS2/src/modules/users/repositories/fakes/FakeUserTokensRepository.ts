import { uuid } from 'uuidv4';
import { v4 } from 'uuid';

import IUserTokensRespository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRespository {
    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: v4(),
            token: v4(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.userTokens.find(
            findToken => findToken.token === token,
        );

        return userToken;
    }
}

export default FakeUserTokensRepository;
