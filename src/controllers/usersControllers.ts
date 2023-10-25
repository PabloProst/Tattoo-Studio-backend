import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";

// User register
const addUser = async (req: Request, res: Response) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // Encrypt password
        const encryptedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create(
            {
                name: name,
                email: email,
                password: encryptedPassword
            }
        ).save();

        console.log(`New user created!`);
        return res.json(newUser);

    } catch (error) {
        return res.json(error);
    }
}

export { addUser };