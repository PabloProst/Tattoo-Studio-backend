import { Router } from "express";
import { addUser, getAppointmentsUser, getArtists, login, profile, updateUser } from "../controllers/usersControllers";
import { auth } from "../middlewares/auth";


const router = Router()

// User register
router.post('/register', addUser);
// User login
router.post('/login', login);
// Profile
router.get('/profile', profile);
// Update user
router.put('/update', auth, updateUser);
// Get artists list
router.get('/list', getArtists);
// My appointments
router.get('/myappointments', auth, getAppointmentsUser)

export { router };