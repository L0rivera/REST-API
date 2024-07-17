import { UserModel } from "../Models/user.js";
import CreateCookie from "../lib/CreateCookie.js";

export class UserController {
  static async register(req, res) {
    const { username, email, password } = req.body;
    const registered = await UserModel.register(username, email, password);
    if(registered) {
      CreateCookie(res, username, email);
      return res.status(200).json({ status: "ok", message: "User registered", user: registered });
    }
  }

  static async login(req, res) {
    const { username, email, password } = req.body;
    const logged = await UserModel.login(email, password);

    if (logged) {
        CreateCookie(res, username, email);
        return res.status(200).json({ status: "ok", message: "User logged in", user: logged });
      }
  }

  // static async GetAll (req, res) {
  //     const
  // }
}
