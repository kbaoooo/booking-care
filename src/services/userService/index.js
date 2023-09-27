import db from "../../models";
import bcrypt from "bcryptjs";
import hashPassword from "../hashPassword";

export const handleUserLogin = async (email, password) => {
  try {
    let response = {};
    let isExist = await checkUserAccout(email);
    if (isExist) {
      let user = await db.User.findOne({
        where: { email },
        attributes: ["email", "password", "lastName", "firstName"],
        raw: true,
      });
      let checkPassword = bcrypt.compareSync(password, user.password);
      delete user.password;
      if (checkPassword) {
        response.errCode = 0;
        response.message = "ok";
        response.data = user;
      } else {
        response.errCode = 2;
        response.message = "Wrong password!";
      }
    } else {
      (response.errCode = 1), (response.message = "Email not exist!");
    }
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const checkUserAccout = async (email) => {
  try {
    let user = await db.User.findOne({
      where: { email },
    });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getAllUsers = async (type) => {
  try {
    let users = "";
    if (type && type === "all") {
      users = await db.User.findAll();
    }
    if (type && type === "less") {
      users = await db.User.findAll({
        limit: 5,
      });
    }
    return users;
  } catch (err) {
    console.error(err);
  }
};

export const createNewUser = async (request) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      role,
      position,
      gender,
      avatar,
    } = request;
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      phone &&
      address &&
      role &&
      position &&
      gender &&
      avatar
    ) {
      let userExist = await checkUserAccout(email);
      if (userExist) {
        return {
          errCode: 3,
          message: "This email has been existed!",
        };
      }
      let getHashPassword = await hashPassword(password);
      await db.User.create({
        firstName,
        lastName,
        password: getHashPassword,
        email,
        address,
        phone,
        roleId: request.role,
        positionId: request.position,
        gender: request.gender,
        image: request.avatar,
      });
      return {
        errCode: 0,
        message: "ok",
        data: request,
      };
    }
    return {
      errCode: 1,
      message: "Missing required params!",
    };
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id },
    });
    if (user) {
      await user.destroy();
      return {
        errCode: 0,
        message: "ok",
      };
    }
    return {
      errCode: 4,
      message: "User does not exist!",
    };
  } catch (err) {
    console.error(err);
  }
};

export const editUser = async (id, request) => {
  try {
    let user = await db.User.findOne({
      where: { id },
    });
    if (user) {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        role,
        position,
        gender,
        avatar,
      } = request;
      if (
        firstName &&
        lastName &&
        email &&
        phone &&
        address &&
        role &&
        position &&
        gender &&
        avatar
      ) {
        user.set({
          firstName,
          lastName,
          email,
          address,
          phone,
          roleId: request.role,
          positionId: request.position,
          gender: request.gender,
          image: request.avatar,
        });
        await user.save();
        return {
          errCode: 0,
          message: "Update user success!",
        };
      }
      return {
        errCode: 1,
        message: "Missing required params!",
      };
    }
    return {
      errCode: 3,
      message: "User does not existed!",
    };
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (id) => {
  try {
    let user = await db.User.findOne({ where: { id } });
    if (user) {
      return {
        errCode: 0,
        message: "ok",
        data: user,
      };
    }
    return {
      errCode: 3,
      message: "User does not exsited!",
    };
  } catch (err) {
    console.error(err);
  }
};

export const getAllCodesService = async (type) => {
  try {
    if (!type) {
      return {
        errCode: 2,
        message: "Missing reqiured params!",
      };
    } else {
      let data = await db.Allcode.findAll({
        where: { type },
      });
      if (data) {
        return {
          errCode: 0,
          message: "ok",
          data,
        };
      }
      return {
        errCode: 3,
        message: "Data does not exsited!",
      };
    }
  } catch (error) {
    console.log(err);
  }
};
