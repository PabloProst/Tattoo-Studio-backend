import { Request, Response } from 'express';
import { Appointment } from '../models/Appointments';
import { User } from '../models/User';

// New appointment
const verifyUser_id = (user_id: string) => {
    return true;
};
const verifyArtist_id = (artist_id: string) => {
    return true;
};

const createAppointment = async (req: Request, res: Response) => {
    try {
        const { artist, date, time } = req.body;
        const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
        const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

        if (!dateFormatRegex.test(date)) {
            return res.status(400).json({
                success: false,
                message: `Formato de fecha incorrecto dd/mm/yy.`,
            });
        }

        if (!timeFormatRegex.test(time)) {
            return res.status(400).json({
                success: false,
                message: `Formato de hora incorrecto hh:mm.`,
            });
        }

        const isValidArtist = verifyArtist_id(artist);

        if (!isValidArtist) {
            return res.status(400).json({
                success: false,
                message: `Artista inválido.`,
            });
        }

        if (req.token && req.token.id) {
            const appointment = new Appointment();
            appointment.user = { id: req.token.id } as User;
            appointment.artist = artist;
            appointment.date = date;
            appointment.time = time;
            await appointment.save();

            return res.json({
                success: true,
                message: `Cita creada exitosamente`,
                appointment,
            });
        } else {
            return res.status(403).json({
                success: false,
                message: `No autorizado. El token no contiene un ID de usuario válido.`,
            });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error creando la cita`,
            error: error,
        });
    }
};



// Edit appointment
const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id, date, time } = req.body;
    const userId = req.token.id;

    const appointment = await Appointment.findOne({
      where: { id, user: { id: userId } },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    appointment.date = date;
    appointment.time = time;
    await appointment.save();

    return res.json({ message: 'Cita actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};  

// Delete appointment
const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const { appointment_id } = req.body; 
        const user_id = req.token.id;
        const appointment = await Appointment.findOne({
            where: {
                id: appointment_id,
                user: { id: user_id } 
            }
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: `No appointment`,
            });
        }

        await appointment.remove();

        return res.json({
            success: true,
            message: `Appointment deleted successfully`,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error deleting appointment`,
            error: error,
        });
    }
};

export { createAppointment, updateAppointment, deleteAppointment }
