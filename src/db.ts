import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { Artist1698227867755 } from "./migration/1698227867755-artist"
import { Artist } from "./models/Artists"
import { Users1698307818959 } from "./migration/1698307818959-users"
export const AppDataSource = new DataSource({
type: "mysql",
host: "localhost",
port: 3306,
username: "root",
password: "Valencia22",
database: "tattoo_studio",
entities: [User, Artist],
migrations: [Artist1698227867755, Users1698307818959],
synchronize: false,
logging: false,
})