import { handleUserLogin } from "../services/userService";

class ApiController {
    async handleLogin(req, res, next) {
        let {email, password} = req.body
            
        if(!email || !password) {
            res.status(500).json({
                errCode: 1,
                message: 'Missing inputs data!'
            })
        }

        const response = await handleUserLogin(email, password)

        res.status(200).json({
            errCode: response.errCode,
            message: response.message,
            data: response.data ? response.data : {},
        })
    }
}

export default new ApiController();