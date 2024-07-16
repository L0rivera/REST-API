import bcryptjs from "bcryptjs";
import { getSession } from "../config.js";
import { error } from "neo4j-driver";

export class UserModel {
  static async register(username, email, password) {
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt);

    const session = getSession();

    try {
      const result = await session.run(
        "CREATE (u:User {username: $username, email: $email, password: $password}) RETURN u",
        { username: username, email: email, password: hashPassword }
      );
      const registered = result.records.map(
        (record) => record.get("u").properties
      );
      return registered;
    } catch (err) {
      console.log(err);
    } finally {
      session.close();
    }
  }

  static async login(email, password, username) {
    const session = getSession();

    try {
      let result = await session.run(
        //Query to take the password of the user by the given email
        "MATCH (u:User {email: $email}) RETURN u.password AS storedPassword",
        { email: email }
      );
      if (result.records.length === 0) {
        // Si no se encuentra el usuario
        res.status(400).json({ message: "Invalid email or password" });
        console.error(`Error ${error}`);
      }
      //Create a const for the password of the database that is hash
      const storedPassword = result.records[0].get("storedPassword");

      //Using bcyptjs we compare the two password
      const isMatch = await bcryptjs.compare(password, storedPassword);
      
      //Compare accepts two parameters one string(password) and one hash(storedPassword) to compare them
      if (!isMatch) {
        return result;
      }
    } catch (err) {
      console.log(`Error: ${err}, messege: ${err.messege}`);
    } finally {
      session.close();
    }
  }
}
