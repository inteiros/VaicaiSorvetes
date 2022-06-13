import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Flavors1652316007910 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'flavors',
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
                        name: 'pic',
                        type: 'varchar',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'flavors',
            new TableForeignKey({
                name: 'FlavorProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('flavors');

        await queryRunner.dropForeignKey('flavors', 'FlavorProvider');
    }
}

