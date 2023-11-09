import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getAppointmentsArtist } from "../controllers/artistsControllers";
import { isArtist } from "../middlewares/isArtist";

const router = Router()

// My appointments
router.get('/admin/myappointments', auth, isArtist, getAppointmentsArtist)

export { router }