import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { User1698219747209 } from "./migration/1698219747209-user"
import { Artist1698227867755 } from "./migration/1698227867755-artist"
import { Artist } from "./models/Artists"
export const AppDataSource = new DataSource({
type: "mysql",
host: "localhost",
port: 3306,
username: "root",
password: "Valencia22",
database: "tattoo_studio",
entities: [User, Artist],
migrations: [User1698219747209, Artist1698227867755],
synchronize: false,
logging: false,
})