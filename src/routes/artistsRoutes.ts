import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getAppointmentsArtist } from "../controllers/artistsControllers";

const router = Router()

// My appointments
router.get('/admin/myappointments', auth, getAppointmentsArtist)

export { router }