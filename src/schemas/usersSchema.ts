import joi from "joi";
import { UserInsertData } from "../repositories/usersRepository";

const userSchema = joi.object<UserInsertData>({
  username: joi.string().required(),
  avatarId: joi.number().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default userSchema;
