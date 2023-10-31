import { Router } from "express";
import { addUser, login, profile, updateUser } from "../controllers/usersControllers";
import { auth } from "../middlewares/auth";

const router = Router()

// User register
router.post('/register', addUser);
// User login
router.post('/login', login);
// Profile
router.get('/profile', auth, profile);
// Update user
router.put('/update', auth, updateUser);

export { router };