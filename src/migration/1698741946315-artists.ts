import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Artists1698741946315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "artists",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "200",
                        isNullable: false
                    },
                    {
                        name: "style",
                        type: "varchar",
                        length: "200",
                        isNullable: false,
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enum: ['admin', 'superadmin'],
                        enumName: 'roleEnum',
                        default: '"admin"'
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },
                ],
            }),
            true
        );
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
