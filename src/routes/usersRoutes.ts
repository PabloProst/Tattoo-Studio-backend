import { Router } from "express";
import { addUser, deleteUserById, login, profile } from "../controllers/usersControllers";
import { auth } from "../middlewares/auth";

const router = Router()

// User register
router.post('/register', addUser);
// User login
router.post('/login', login);
// Profile
router.get('/profile', auth, profile);
// User delete
router.delete('/:id', deleteUserById);

export { router };