import CRUDController from "../controllers/CRUDController";
import { Router } from "express";

const crudRouter = Router();

crudRouter.delete('/:id/delete-crud', CRUDController.deleteCRUD)
crudRouter.put('/:id/update-user', CRUDController.updateCRUD)
crudRouter.get('/edit-crud/:id', CRUDController.editCRUD)
crudRouter.get('/read-crud', CRUDController.readCRUD)
crudRouter.post('/post-user', CRUDController.postCRUD)
crudRouter.get('/add-crud', CRUDController.addCRUD)
crudRouter.get('/', CRUDController.CRUD)

export default crudRouter;