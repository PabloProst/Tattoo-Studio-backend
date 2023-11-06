import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Appointments1699215305289 implements MigrationInterface {

        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "appointments",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment",
                        },
                        {
                            name: "user_id",
                            type: "int",
                        },
                        {
                            name: "artist_id",
                            type: "int",
                        },
                        {
                            name: "time",
                            type: "varchar",
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
                            onUpdate: "CURRENT_TIMESTAMP",
                        },
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["userId"],
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            onDelete: "CASCADE",
                        },
                        {
                            columnNames: ["artistId"],
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
            await queryRunner.dropTable("appointments");
        }
    }
    