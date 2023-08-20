import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10)

async function hashPassword(password) {
    try {
        const hash = await bcrypt.hashSync(password, salt) 
        return hash;
    } catch(e) {
        console.error(e)
    }
}

export default hashPassword;