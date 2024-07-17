import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function CreateCookie(res, username, email) {
  const token = jsonwebtoken.sign(
    { username: username, email: email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
      httpOnly: true, // Asegura que la cookie no sea accesible desde JavaScript del cliente
    secure: process.env.NODE_ENV === 'production', // Solo enviar la cookie sobre HTTPS en producción
    sameSite: 'strict', // Prevenir CSRF
    path: "/",
  };
  res.cookie("jwt", token, cookieOption);
}

export default CreateCookie;
