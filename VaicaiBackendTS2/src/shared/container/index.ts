import { container, delay } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IFlavorsRepository from '@modules/flavors/repositories/IFlavorsRepository';
import FlavorsRepository from '@modules/flavors/infra/typeorm/repositories/FlavorsRepository';

container.registerSingleton<IOrdersRepository>(
    'OrdersRepository',
    delay(() => OrdersRepository),
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    delay(() => UsersRepository),
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    delay(() => UserTokensRepository),
);

container.registerSingleton<IFlavorsRepository>(
    'FlavorsRepository',
    delay(() => FlavorsRepository),
);
