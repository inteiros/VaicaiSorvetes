import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Orders1652316715727 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'provider_id',
                        type: 'uuid',
                    },
                    {
                        name: 'price',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                    },
                    {
                        name: 'payment',
                        type: 'varchar',
                    },
                    {
                        name: 'flavors',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrderProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrderUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');

        await queryRunner.dropForeignKey('orders', 'OrderProvider');
        await queryRunner.dropForeignKey('orders', 'OrderUser');
    }
}
