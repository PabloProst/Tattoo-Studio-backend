const createAppointment = async (req: Request, res: Response) => {
    try {
        const { user_id, artist_id, time } = req.body;

        // Crear la cita
        const appointment = new Appointment();
        appointment.user_id = user_id;
        appointment.artist_id = artist_id;
        appointment.time = time;
        appointment.created_at = new Date();
        appointment.updated_at = new Date();

        await appointment.save();

        return res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            appointment,
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Error creating appointment",
            error: error,
        });
    }
};
