import { Request, Response } from 'express';
import { Artist } from '../models/Artists';
import { Appointment } from '../models/Appointments';

// My appointments
const getAppointmentsArtist = async (req:Request, res:Response) => {
    try {
      const artist_id = req.body.id;
  
      const AllYourAppointment = await Appointment.find({
        where: {
          artist: { id: artist_id }
        }
      });
  
      return res.json({
        success: true,
        message: `Appointments retrieved`,
        data: AllYourAppointment,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: `Appointments can not be retrieved`,
        error: error,
      });
    }
  }; 


  export { getAppointmentsArtist }