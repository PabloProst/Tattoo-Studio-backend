import { Router } from "express";
import { addUser } from "../controllers/usersControllers";

const router = Router ();

// User register
router.post('/register', addUser);

export { Router };