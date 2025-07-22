import { Request, Response } from 'express';
import User from '../models/userModel';



export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName } = req.body;

    const user = await User.create({ firstName, lastName });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'User creation failed', error: err });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};
