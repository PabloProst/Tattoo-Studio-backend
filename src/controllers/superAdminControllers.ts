import { Request, Response } from "express";
import { Artist } from "../models/Artists";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

// New artist
const addArtist = async (req: Request, res: Response) => {
    try {
        const { name, email, password, style, role } = req.body;

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
            style: style,
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
                message: `Artist can not be created.`,
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
                    message: `email or password incorrect`,
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
            artist_id: artist.id,
            email: artist.email,
            token: token,
            role: artist.role
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


// Get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        return res.json({
            users
        });

    } catch (error) {
        return res.json({
            success: false,
            message: `Users can't be retrieved`,
            error: error
        });
    }
};


// Delete user
const deleteUser = async (req: Request, res: Response) => {
    try {
        const idUser = req.body.id;
        const user = await User.findOneBy({ id: idUser });

        if (user) {
            await User.delete({ id: idUser });
            return res.json({
                message: `Usuario fue eliminado`
            });
        } else {
            return res.json({
                success: false,
                message: `User was not found`
            });
        }

    } catch (error) {
        return res.json({
            success: false,
            message: `User can not be deleted`,
            error: error
        });
    }
}




export { addArtist, loginArtist, getAllUsers, deleteUser }

