// Express import
import express from "express";
import { AppDataSource } from "./db";
import { router } from "./routes/usersRoutes";
import { router as routerGallery } from "./routes/galleryRoutes";
import { router as routerAdmin } from "./routes/superAdminRoutes";

const app = express();

// Port
const PORT = process.env.PORT || 3430;

//middleware
app.use(express.json());


app.use('/', router);
app.use('/', routerGallery)
app.use('/', routerAdmin)

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
