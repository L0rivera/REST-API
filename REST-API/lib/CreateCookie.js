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
    path: "/",
  };
  res.cookie("jwt", token, cookieOption);
}

export default CreateCookie;
