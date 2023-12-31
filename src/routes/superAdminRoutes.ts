import { Router } from "express";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { addArtist, deleteUser, getAllAppointments, getAllUsers, loginArtist } from "../controllers/superAdminControllers";
import { auth } from "../middlewares/auth";

const router = Router()

// New artist
router.post('/admin/register', auth, isSuperAdmin, addArtist)
// Admin login
router.post('/admin/login', loginArtist)
// Users list
router.get('/admin/users',auth, getAllUsers)
// Delete user
router.delete('/admin/delete', auth, isSuperAdmin, deleteUser)
// All Appointments
router.get('/admin/allappointments',auth, getAllAppointments)

export { router }