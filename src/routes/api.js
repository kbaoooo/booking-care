import { Router } from "express";
import ApiController from "../controllers/ApiController";

const apiRouter = Router();

apiRouter.delete("/delete-user/:id", ApiController.handleDeleteUser);
apiRouter.put("/edit-user/:id", ApiController.handleEditUser);
apiRouter.post("/create-new-user", ApiController.handleCreateNewUser);
apiRouter.get("/get-all-users", ApiController.handleGetAllUsers);
apiRouter.get("/detail-user/:id", ApiController.handleGetDetailUser);
apiRouter.post("/login", ApiController.handleLogin);
apiRouter.get("/allcodes", ApiController.getAllCodes);

apiRouter.get("/get-top-doctors-home", ApiController.handleGetTopDoctors);
apiRouter.get("/get-all-doctors", ApiController.handleGetAllDoctors);
apiRouter.post("/save-doctor-info", ApiController.handleSaveDoctorInfo);
apiRouter.get("/get-detail-doctor/:id", ApiController.handleGetDetailDoctor);

apiRouter.post("/bulk-create-schedule", ApiController.handleBulkCreateSchedule);
apiRouter.get("/get-doctor-schedule-by-date", ApiController.handleGetScheduleByDate);

export default apiRouter;
