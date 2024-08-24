// all functions that need it to sevice with user
// registeration function
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// any function you use it with data should to use (async-await) promise
// register function-----------------------------------------------------------------------------------------------------------
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  //first check if the user is in my data
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User is already exists !", statusCode: 400 };
  }
  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);
  // other wise create a new user
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  // save new user in db
  await newUser.save();
  return { data: generateJWT({firstName,lastName,email}), statusCode: 200 };
};

// login function------------------------------------------------------------------------------------------------------------

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  // searching inside db
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect email or Password!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return { data: generateJWT({firstName: findUser.firstName, lastName: findUser.lastName, email}), statusCode: 200 };
  }

  return { data: "Incorrect email or Password!", statusCode: 400 };
};

// generate JWT -----------------------------------------------------------------------------------------------------------
const generateJWT = (data: any) => {
  return jwt.sign(data, "#SoXCs&QVu0KbR8BPmifUVaq46V5BX0I6EFWokiB&j6qRfF4nSJjaijQ5?3pOFgSp",{expiresIn: "24h"});
};




// generate random key -----------------------------------------------------------------------------------------------------------

// function to generate a key
// const getRandomKey = () => {
//   const letters =
//     "?!@$%&0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
//   let cod = "#";
//   for (let i = 0; i < 64; i++) {
//     cod += letters[Math.floor(Math.random() * 64)];
//   }
//   return cod;
// };
// console.log(getRandomKey());
