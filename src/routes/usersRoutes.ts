import { addUser, deleteUserById, login } from "../controllers/usersControllers";
import express from 'express';
const router = express.Router();


// User register
router.post('/register', addUser);

// User login
router.post('/login', login)

// User delete
router.delete('/:id', deleteUserById)


export { router };