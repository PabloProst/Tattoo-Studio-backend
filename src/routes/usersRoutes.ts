import { Router } from "express";
import { addUser, getArtists, getGallery, login, newAppointment, profile, updateUser } from "../controllers/usersControllers";
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
// Get artists list
router.get('/list', auth, getArtists);
// Get tattoo list
router.get('/gallery', auth, getGallery);
//  New appointment
router.post('/appointment', auth, newAppointment)

export { router };