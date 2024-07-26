// createcookie.js
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function CreateCookie(res, username, email) {
  const token = jsonwebtoken.sign(
    { username, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    path: '/',
    httpOnly: true, // Agrega esta opción para mayor seguridad
    secure: process.env.NODE_ENV === 'production' // Configura secure solo en producción
  };

  res.cookie('jwt', token, cookieOptions);
}

export default CreateCookie;
