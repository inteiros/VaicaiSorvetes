import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Flavor from '@modules/flavors/infra/typeorm/entities/Flavor';

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @Column()
    name: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column()
    username: string;

    @Column()
    payment: string;

    @Column()
    flavors: string;

    @Column()
    user_id: string;

    @Column()
    price: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;
}

export default Order;
