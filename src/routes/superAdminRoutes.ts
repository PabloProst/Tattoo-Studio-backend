import { Router } from "express";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { addArtist, loginArtist } from "../controllers/superAdminControllers";


const router = Router()

// New artist
router.post('/artist', isSuperAdmin, addArtist)
// Admin login
router.post('/admin/login', loginArtist)

export { router }