import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";

// User register
const addUser = async (req: Request, res: Response) => {
  try {
    // Take info from body
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Check email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.json({ mensaje: `Invalid email address.` });
    }

    // Check the password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.json({
        mensaje: `The password must be at least 8 characters long, include at least one number, and have a special character.`
      });
    }

    // Encrypt password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // Save info on database
    const newUser = await User.create({
      name: name,
      email: email,
      password: encryptedPassword
    }).save();

    // Send a message
    return res.json({
      success: true,
      message: `User created succesfully.`,
      token: newUser
    });

  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: `User cant be created.`,
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

    // Check user
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

// Delete user
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userIdToDelete = req.params.id

    const userDeleted = await User.delete(
      {
        id: parseInt(userIdToDelete)
      }
    )

    if (userDeleted.affected) {
      return res.send(`Id ${userIdToDelete} has been successfully deleted.`)
    }

    return res.send(`Nothing has been deleted.`)
  } catch (error) {
    return res.send(error)
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
              message: "profile user retrieved",
              data: user
          }
      )
  } catch (error) {
      return res.json(
        {
          success: false,
          message: "User profile cant be retrieved",
          error: error
        }
      )
  }
}


export { addUser, deleteUserById, login, profile };
