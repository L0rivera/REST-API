import { UserModel } from "../Models/user.js";
import CreateCookie from "../lib/CreateCookie.js";

export class UserController {
  static async register(req, res) {
    const { username, email, password } = req.body;
    const registered = await UserModel.register(username, email, password);

    CreateCookie(res, username, email);

    res.json(registered);
  }

  static async login(req, res) {
    const { username, email, password } = req.body;
    const logged = await UserModel.login(email, password);

    CreateCookie(res, username, email);
    res.send({ status: "ok", message: "User logged in", redirect: "/" });
    res.json(logged);
  }

  // static async GetAll (req, res) {
  //     const
  // }
}
