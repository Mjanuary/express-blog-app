import { UserInterface } from "../interfaces";
import { UserModel } from "./../models";
import { Types } from "mongoose";
export class UserService {
  static getUsers = async (): Promise<any[]> => {
    try {
      return await UserModel.find();
    } catch (e) {
      throw e;
    }
  };

  static createUser = async (user: UserInterface) => {
    try {
      let checkEmail = await UserModel.find({ email: user.email });
      if (checkEmail.length >= 1) throw new Error("Email already exists");

      return await UserModel.create(user);
    } catch (e) {
      throw e;
    }
  };

  static updateUser = async (user: UserInterface) => {
    try {
      const { email, names, username, _id } = user;
      return await UserModel.updateOne(
        { _id },
        {
          $set: {
            names,
            email,
            username,
          },
        }
      );
    } catch (e) {
      throw e;
    }
  };

  static deleteUser = async (userId: any) => {
    try {
      return await UserModel.deleteOne({ _id: userId });
    } catch (e) {
      throw e;
    }
  };
}
