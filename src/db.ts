import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { User1698219747209 } from "./migration/1698219747209-user"
export const AppDataSource = new DataSource({
type: "mysql",
host: "localhost",
port: 3306,
username: "root",
password: "Valencia22",
database: "tattoo_studio",
entities: [User],
migrations: [User1698219747209],
synchronize: false,
logging: false,
})