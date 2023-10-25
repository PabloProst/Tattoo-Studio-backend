import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1698219747209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
            name: "users",
            columns: [
            {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            },
            {
            name: "title",
            type: "varchar",
            length: "255",
            },
            {
            name: "director",
            type: "int",
            },
            ],
            }),
            true
            );
            }

    

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
