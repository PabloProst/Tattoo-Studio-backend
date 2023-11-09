import { Router } from "express";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { addArtist, deleteUser, getAllUsers, loginArtist } from "../controllers/superAdminControllers";
import { auth } from "../middlewares/auth";

const router = Router()

// New artist
router.post('/admin/register', auth, isSuperAdmin, addArtist)
// Admin login
router.post('/admin/login', loginArtist)
// Users list
router.get('/admin/users', auth, isSuperAdmin, getAllUsers)
// Delete user
router.delete('/admin/delete', auth, isSuperAdmin, deleteUser)

export { router }