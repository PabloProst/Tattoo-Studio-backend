import { Router } from "express";
import { createAppointment, deleteAppointment, editAppointment } from "../controllers/appointmentsControllers";
import { auth } from "../middlewares/auth";


const router = Router()

// New appointment
router.post('/appointment/new', auth, createAppointment)
// Edit appointment
router.put('/appointment/modify', auth, editAppointment)
// Delete appointment
router.delete('/appointment/delete', deleteAppointment)

export { router }