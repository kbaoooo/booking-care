import { handleUserLogin, getAllUsers, createNewUser, deleteUser, editUser, getUserById } from "../services/userService";

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

    async handleGetAllUsers(req, res, next) {
        let type = req.query.type || 'all';
        let users =  await getAllUsers(type);

        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            users
        })
    }

    async handleCreateNewUser(req, res, next) {
        let request = req.body;
        let data = await createNewUser(request);
        return res.status(200).json(data)
    }

    async handleDeleteUser(req, res, next) {
        let id = req.params.id;
        if(!id) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing required params!'
            })
        }
        let response = await deleteUser(id)
        res.status(200).json(response)
    }

    async handleEditUser(req, res, next) {
        let id = req.params.id;
        let request = req.body;
        let response =  await editUser(id, request)
        res.status(200).json(response)
    }

    async handleGetDetailUser(req, res, next) {
        let id = req.params.id;
        let response = await getUserById(id);
        res.status(200).json(response)
    }
}

export default new ApiController();