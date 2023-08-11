import db from "../../models";
import bcrypt from "bcryptjs";

export const handleUserLogin = async (email, password) => {
    try {
        let response = {};
        let isExist = await checkUserEmail(email);
        if(isExist) {
            let user = await db.User.findOne({
                where: {email},
                attributes: ['email', 'password'],
                raw: true
            })
            let checkPassword = bcrypt.compareSync(password, user.password)
            delete user.password
            if(checkPassword) {
                response.errCode = 0
                response.message = 'ok'
                response.data = user
            } else {
                response.errCode = 2
                response.message = 'Wrong password!'
            }
        } else {
            response.errCode = 1,
            response.message = 'Email not exist!'
        }
        return response;
    } catch(err) {
        console.error(err);
    }
}

export const checkUserEmail = async (email) => {
    try {
        let user = await db.User.findOne({
            where: {email}
        })
        if(user) {
            return true
        } else {
            return false
        }
    } catch(err) {
        console.error(err);
    }
}

export const checkUserPassword = async (password) => {
    try {

    } catch(err) {
        console.error(err);
    }
}