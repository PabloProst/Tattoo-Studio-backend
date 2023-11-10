import { Router } from "express";
import { createAppointment, deleteAppointment, updateAppointment } from "../controllers/appointmentsControllers";
import { auth } from "../middlewares/auth";


const router = Router()

// New appointment
router.post('/appointment/new', auth, createAppointment)
// Edit appointment
router.put('/appointment/modify', auth, updateAppointment)
// Delete appointment
router.delete('/appointment/delete',auth, deleteAppointment)


export { router }