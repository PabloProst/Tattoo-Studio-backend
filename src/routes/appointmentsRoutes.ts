import { Router } from "express";
import { createAppointment } from "../controllers/appointmentsControllers";
import { auth } from "../middlewares/auth";


const router = Router()

// New appointment
router.post('/appointment/new', auth, createAppointment)

export { router }