import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { Artist } from "../models/Artists";
import { Gallery } from "../models/Gallery";
import { Appointment } from "../models/Appointments";


// User register
const addUser = async (req: Request, res: Response) => {
  try {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.json({ mensaje: `Invalid email address.` });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.json({
        mensaje: `The password must be at least 8 characters long, include at least one number, and have a special character.`
      });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: encryptedPassword
    }).save();

    return res.json({
      success: true,
      message: `User created succesfully.`,
      token: newUser
    });

  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: `User can not be created.`,
        error: error
      }
    );
  }
}

// Login
const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(400).json(
        {
          success: false,
          message: `Email or password incorrect`,
        }
      );
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json(
        {
          success: false,
          message: `Email or password incorrect`,
        }
      );
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      "geekshubs",
      {
        expiresIn: "3h",
      }
    );

    return res.json({
      success: true,
      message: `Login successful, welcome ${user.name}`,
      user_id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      token: token
    });

  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: `Error during login.`,
        error: error
      }
    );
  }
}

// Profile
const profile = async (req: Request, res: Response) => {
  try{
      const user = await User.findOneBy(
          {
              id: req.token.id
          }
      )

      return res.json(
          {
              success: true,
              message: `profile user retrieved`,
              data: user
          }
      )
  } catch (error) {
      return res.json(
        {
          success: false,
          message: `User profile can not be retrieved`,
          error: error
        }
      )
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.token.id;
    const { email, name } = req.body;

    console.log(`Updating user with ID: ${userId}`);

    const updates: any = {}; // Usamos 'any' para aceptar tanto email como name

    if (email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailRegex.test(email)) {
        console.log(`Invalid email address: ${email}`);
        return res.json({ mensaje: `Invalid email address.` });
      }

      updates.email = email;
      console.log(`Email updated successfully: ${email}`);
    }

    if (name) {
      updates.name = name;
      console.log(`Name updated successfully: ${name}`);
    }

    await User.update(userId, updates);
    console.log(`User updated successfully`);
    return res.json({
      success: true,
      message: `User information updated successfully.`
    });
  } catch (error) {
    console.error(`Error updating user information: ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error updating user information.`,
      error: error
    });
  }
};




// List artists
const getArtists = async (req: Request, res: Response) => {
  try {
    const listArtist = await Artist.find({
    });

    return res.json(
      {
        success: true,
        message: `Artists retrieved`,
        data: listArtist
      }
    )

  } catch (error) {
    return res.json(
      {
        success: false,
        message: `Artists can not be retrieved`,
        error: error
      }
    )
  }
}

// Get tattoo list
const getGallery = async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.find();

    return res.json(
      {
        success: true,
        message: `Gallery retrieved`,
        data: gallery
      }
    );

  } catch (error) {
    return res.json(
      {
        success: false,
        message: `Gallery can not be retrieved`,
        error: error
      }
    );
  }
};


// My appointments
const getAppointmentsUser = async (req:Request, res:Response) => {
  try {

    const user_id = req.token.id;
    
    const AllYourAppointment = await Appointment.find({
      where: {
        user: { id: user_id }
      },
      relations: ['artist']
    });
    
    if (AllYourAppointment.length === 0) {
      return res.json({
        message: `No appointments`
      });
    }

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

export { addUser, login, profile, updateUser, getArtists, getGallery, getAppointmentsUser};
