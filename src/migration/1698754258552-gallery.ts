import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Gallery1698754258552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "gallery",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "tattoo",
                        type: "int",
                    },
                    {
                        name: "artist_id",
                        type: "int",
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["artist_id"],
                        referencedTableName: "artists",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("gallery");
    }
}
