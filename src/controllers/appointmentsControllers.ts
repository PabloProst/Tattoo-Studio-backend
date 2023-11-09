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
                message: `Incorrect format. dd/mm/yy`,
            });
        }

        const appointment = new Appointment();
        appointment.user = user;
        appointment.artist = artist;
        appointment.time = time;

        await appointment.save();

        return res.json({
            success: true,
            message: `Appointment created succesfully`,
            appointment,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error creating appointment`,
            error: error,
        });
    }
};


// Edit appointment
const editAppointment = async (req: Request, res:Response) => {
    try {
        const { user, artist, time } = req.body;

        const query = `
            UPDATE appointments
            SET user_id = ?, artist_id = ?, time = ?
            WHERE id = ?;
        `;
        const values = [user, artist, time, req.params.appointmentId]; 

        await Appointment.query(query, values);

        return res.json({
            success: true,
            message: `Appointment updated succesfully`,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error updating the appointment`,
            error: error,
        });
    }
};




// Delete appointment
const deleteAppointment = async (req:Request, res:Response) => {
    try {
        const { id } = req.body;

        const appointment = await Appointment.findOne(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: `Appointment not found`,
            });
        }

        await appointment.remove();

        return res.json({
            success: true,
            message: `Appointment deleted succesfully`,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error deleting the appointment`,
            error: error,
        });
    }
};


export { createAppointment, editAppointment, deleteAppointment }
