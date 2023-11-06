import { Request, Response } from 'express';
import { Appointment } from '../models/Appointments';

const createAppointment = async (req: Request, res: Response) => {
    try {
        const { user, artist, time } = req.body;

        // Crear la cita
        const appointment = new Appointment();
        appointment.user = user;
        appointment.artist = artist;
        appointment.time = time;

        await appointment.save();

        return res.json({
            success: true,
            message: "Cita creada exitosamente",
            appointment,
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Error al crear la cita",
            error: error,
        });
    }
};

export {createAppointment}
