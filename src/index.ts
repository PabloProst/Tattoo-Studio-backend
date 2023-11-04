// Express import
import express from "express";
import { AppDataSource } from "./db";
import { router } from "./routes/usersRoutes";
import { router as routerGallery } from "./routes/galleryRoutes";

const app = express();

// Port
const PORT = process.env.PORT || 3430;

//middleware
app.use(express.json());


app.use('/', router);
app.use('/', routerGallery)

// Server running
app.listen(3430, () => 
console.log(`Server running on ${PORT} port`)
);

// Database connection
AppDataSource.initialize()
.then(() => {
console.log('Database connected');
})
.catch(error => {
console.log(error)
})
