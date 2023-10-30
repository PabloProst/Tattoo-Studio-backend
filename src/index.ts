// Express import
import express from "express";
import { AppDataSource } from "./db";
import { router } from "./routes/usersRoutes";

const app = express();

// Port
const PORT = process.env.PORT || 3430;

//middleware
app.use(express.json());


app.use('/', router);

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
