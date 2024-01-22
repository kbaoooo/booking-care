import {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
  getUserById,
  getAllCodesService,
} from "../services/userService";

import {
  getTopDoctorsService,
  getAllDoctorsService,
  saveDoctorInfoService,
  getDetailDoctor,
  bulkCreateSchedule,
  getScheduleByDateDoctor,
} from "../services/doctorService";

class ApiController {
  async handleLogin(req, res, next) {
    let { email, password } = req.body;

    if (!email || !password) {
      res.status(500).json({
        errCode: 1,
        message: "Missing inputs data!",
      });
    }

    const response = await handleUserLogin(email, password);

    res.status(200).json({
      errCode: response.errCode,
      message: response.message,
      data: response.data ? response.data : {},
    });
  }

  async handleGetAllUsers(req, res, next) {
    let type = req.query.type || "all";
    let users = await getAllUsers(type);

    return res.status(200).json({
      errCode: 0,
      message: "ok",
      users,
    });
  }

  async handleCreateNewUser(req, res, next) {
    let request = req.body;
    let data = await createNewUser(request);
    return res.status(200).json(data);
  }

  async handleDeleteUser(req, res, next) {
    let id = req.params.id;
    if (!id) {
      return res.status(500).json({
        errCode: 1,
        message: "Missing required params!",
      });
    }
    let response = await deleteUser(id);
    res.status(200).json(response);
  }

  async handleEditUser(req, res, next) {
    let id = req.params.id;
    let request = req.body;
    let response = await editUser(id, request);
    res.status(200).json(response);
  }

  async handleGetDetailUser(req, res, next) {
    let id = req.params.id;
    let response = await getUserById(id);
    res.status(200).json(response);
  }

  async getAllCodes(req, res, next) {
    try {
      let response = await getAllCodesService(req.query.type);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        errCode: -1,
        message: "Error from server",
      });
    }
  }

  async handleGetTopDoctors(req, res, next) {
    let limit = 10;
    if (req.query.limit) console.log(req.query.limit);
    limit = +req.query.limit;
    try {
      let response = await getTopDoctorsService(limit);
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        errCode: 1,
        message: "Error from server",
      });
    }
  }

  async handleGetAllDoctors(req, res, next) {
    try {
      let response = await getAllDoctorsService();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        errCode: 1,
        message: "Error from server",
      });
    }
  }

  async handleSaveDoctorInfo(req, res, next) {
    try {
      let response = await saveDoctorInfoService(req.body);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        errCode: 1,
        message: "Error from server",
      });
    }
  }

  async handleGetDetailDoctor(req, res, next) {
    try {
      let id = req.params.id;
      let doctor = await getDetailDoctor(id);
      return res.status(200).json(doctor);
    } catch (error) {
      return res.status(200).json({
        errCode: -1,
        message: "Error from server!",
      });
    }
  }

  async handleBulkCreateSchedule(req, res, next) {
    try {
      let data = req.body;
      let response = await bulkCreateSchedule(data);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(200).json({
        errCode: -1,
        message: "Error from server!",
      });
    }
  }

  async handleGetScheduleByDate(req, res, next) {
    try {
      let info = await getScheduleByDateDoctor(
        req.query.doctorId,
        req.query.date
      );
      return res.status(200).json(info);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ApiController();
