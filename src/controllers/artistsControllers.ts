import { Request, Response } from 'express';
import { Appointment } from '../models/Appointments';

// My appointments
const getAppointmentsArtist = async (req:Request, res:Response) => {
    try {
      const artist_id = req.token.id;
      
      const AllYourAppointment = await Appointment.find({
        where: {
          artist: { id: artist_id }
        },
        relations: ['user']
      });
      
      return res.json({
        success: true,
        message: `Appointments retrieved`,
        data: AllYourAppointment,
      });
    } catch (error) {
      console.log(error);
      
      return res.json({
        success: false,
        message: `Appointments can not be retrieved`,
        error: error,
      });
    }
  }; 

  export { getAppointmentsArtist }