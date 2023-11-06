import { Request, Response } from 'express';
import { Appointment } from '../models/Appointments';


// New appointment
const createAppointment = async (req: Request, res: Response) => {
    try {
        const { user, artist, time } = req.body;
        const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;

        if (!dateFormatRegex.test(time)) {
            return res.status(400).json({
                success: false,
                message: "El formato de la fecha es incorrecto. Debe ser dd/mm/yy",
            });
        }

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


// Edit appointment
const editAppointment = async (req: Request, res: Response) => {
    try {
      console.log("entro al try");
  
      const tokenGiven = req.token.id;
      const { id, user, artist, time } = req.body;
  
      if (tokenGiven === user) {
        const appointmentToUpdate = id;
  
        await Appointment.update(
          { id: parseInt(appointmentToUpdate) },
          { id, user, artist, time }
        );
  
        return res.json();
      } else {
        return res.json({ mensaje: "Invalid user_id" });
      }
    } catch (error) {
      return res.json(error);
    }
  };
  

// Delete appointment
const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const appointment = await Appointment.findOne(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Cita no encontrada",
            });
        }
        await appointment.remove();

        return res.json({
            success: true,
            message: "Cita eliminada exitosamente",
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la cita",
            error: error,
        });
    }
};

export {createAppointment, editAppointment, deleteAppointment}
