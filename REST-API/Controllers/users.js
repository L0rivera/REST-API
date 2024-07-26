import { UserModel } from "../Models/user.js";
import CreateCookie from "../lib/CreateCookie.js";

export class UserController {
  static async register(req, res) {
    const { username, email, password } = req.body;
    const registered = await UserModel.register(username, email, password);

    if(registered) {
    CreateCookie(res, username, email);
    let { token } = CreateCookie();
    res.send({ registered, token});
   }
  }

  static async login(req, res) {
    const { username, email, password } = req.body;
    try {
      const logged = await UserModel.login(email, password);
      const token = jsonwebtoken.sign(
        { username, email },
        process.env.JWT_SECRET,
        { expiresIn: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ) }
      );
      res.cookie('jwt', token, {
        path: '/',
        httpOnly: true, // Agrega esta opción para mayor seguridad
        secure: process.env.NODE_ENV === 'production' // Configura secure solo en producción
      })
      .send({ logged, token})
    } catch(err) {

    }
   }
  
  

  // static async GetAll (req, res) {
  //     const
  // }
}
