import { Request, Response } from "express";
import { UserModel } from "../models/user.models";
import bcrypt from "bcrypt"

export const getUsersById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const user = await UserModel.findById(userId);

    res.json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // check if the user exists
    const user = await UserModel.findOne({ email }).lean().exec();

    if (user) {
      //check if password matches
      const isMatching = await bcrypt.compare(password, user.password);

      const { password: secret, ...rest } = user;

      if (isMatching) {
        res.status(200).json({ ...rest });
      } else {
        res.json(isMatching);
      }
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const register = async (req: Request, res: Response) => {
  console.log("Req", req.body);

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await UserModel.create(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};
