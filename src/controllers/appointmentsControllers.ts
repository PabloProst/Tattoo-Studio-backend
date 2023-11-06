import { Request, Response } from 'express';
import { Appointment } from '../models/Appointments';


// New appointment
const createAppointment = async (req: Request, res: Response) => {
    try {
        const { user, artist, time } = req.body;

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

// Update appointment
const editAppointment = async (req: Request, res: Response) => {
    try {
      if (req.token.id === req.body.user_id) {  
        const appointmentToUpdate = req.body.id
        const id = req.body.id;
        const user = req.body.user;
        const artist = req.body.artist;
        const time = req.body.time;
    
        await Appointment.update(
          {
            id: parseInt(appointmentToUpdate),
          },
          {
            id: id,
            user: user,
            artist: artist,
            time: time
          }
        );
  
        const updatedAppointment = await Appointment.findOneBy({
          id: parseInt(appointmentToUpdate),
        });
  
        const response = {
          updatedAppointment,
        };
  
        return res.json(response);
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
