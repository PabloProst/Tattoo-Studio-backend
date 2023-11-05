import { Request, Response } from "express";
import { Artist } from "../models/Artists";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// New artist
const addArtist = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

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

        const newArtist = await Artist.create({
            name: name,
            email: email,
            password: encryptedPassword,
            role: role
        }).save();

        return res.json({
            success: true,
            message: `Artist created successfully.`,
            token: newArtist
        });

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: `Artist can't be created.`,
                error: error
            }
        );
    }
}


// Login
const loginArtist = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const artist = await Artist.findOne({
        where: {
          email: email
        }
      });
  
      if (!artist) {
        return res.status(400).json(
          {
            success: false,
            message: `Email or password incorrect`,
          }
        );
      }
  
      if (!bcrypt.compareSync(password, artist.password)) {
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
          id: artist.id,
          email: artist.email,
          role: artist.role
        },
        "geekshubs",
        {
          expiresIn: "3h",
        }
      );
  
      return res.json({
        success: true,
        message: `Login successful, welcome ${artist.name}`,
        user_id: artist.id,
        email: artist.email,
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

export { addArtist, loginArtist }

