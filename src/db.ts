import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { Artist } from "./models/Artists"
import { Users1698741920671 } from "./migration/1698741920671-users"
import { Artists1698741946315 } from "./migration/1698741946315-artists"
import { Gallery1698754258552 } from "./migration/1698754258552-gallery"
import { Gallery } from "./models/Gallery"
import { Appointment } from "./models/Appointments"
import { Appointments1699540877956 } from "./migration/1699540877956-Appointments"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Valencia22",
    database: "tattoo_studio",
    entities: [User, Artist, Gallery, Appointment],
    migrations: [Users1698741920671, Artists1698741946315, Gallery1698754258552, Appointments1699540877956],
    synchronize: false,
    logging: false,
})