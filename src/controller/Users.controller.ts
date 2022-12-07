import { Request, Response } from "express";
import { Types } from "mongoose";
import { UserService } from "../service";
import { errorHandler } from "../utils/error";

interface ErrorInterface {
  [key: string]: string;
}

export const AllUsers = async (req: Request, res: Response) => {
  try {
    let data = await UserService.getUsers();

    return res.send(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, names } = req.body;

    let data = await UserService.createUser({
      username,
      email,
      names,
      createdAt: new Date(),
    });

    return res.send(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, names, userId } = req.body;

    let data = await UserService.updateUser({
      username,
      email,
      names,
      _id: new Types.ObjectId(userId),
    });

    return res.send(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    let data = await UserService.deleteUser(new Types.ObjectId(userId));
    return res.send(data);
  } catch (error) {
    errorHandler(res, error);
  }
};
