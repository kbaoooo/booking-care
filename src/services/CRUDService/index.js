import hashPassword from "../hashPassword";
import db from "../../models";

export async function createNewUser(data) {
    const getHashPassword = await hashPassword(data.password)
    await db.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        password: getHashPassword,
        email: data.email,
        address:data.address,
        phone: data.phone,
        roleId: data.roleId,
        gender: data.gender === '1' ? true : false,
    })
}

export async function getUsers() {
    let users = await db.User.findAll();
    return users;
}

export async function getUserById(id) {
    let user = await db.User.findOne({ where: { id } })
    return user
}