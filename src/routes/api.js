import { Router } from "express";
import ApiController from "../controllers/ApiController";

const apiRouter = Router();

apiRouter.delete('/delete-user/:id', ApiController.handleDeleteUser)
apiRouter.put('/edit-user/:id', ApiController.handleEditUser)
apiRouter.post('/create-new-user', ApiController.handleCreateNewUser)
apiRouter.get('/get-all-users/', ApiController.handleGetAllUsers)
apiRouter.post('/login', ApiController.handleLogin)

export default apiRouter;