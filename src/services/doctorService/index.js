import { where } from "sequelize";
import db from "../../models";
require("dotenv").config();
import _ from "lodash";
import { raw } from "body-parser";

const MAX_NUMBER_PATIENTS = process.env.MAX_NUMBER_PATIENTS;

export const getTopDoctorsService = async (limit) => {
  try {
    let doctors = await db.User.findAll({
      where: { roleId: "R2" },
      limit,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      errCode: 0,
      message: "ok",
      data: doctors,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getAllDoctorsService = async () => {
  try {
    let doctors = await db.User.findAll({
      where: { roleId: "R2" },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      errCode: 0,
      message: "ok",
      data: doctors,
    };
  } catch (error) {
    console.log(error);
  }
};

export const saveDoctorInfoService = async (data) => {
  try {
    let id = data.selectedDoctor.value;
    if (
      !id ||
      !data.contentHTML ||
      !data.contentMarkdown ||
      !data.selectedPrice ||
      !data.selectedPayment ||
      !data.selectedProvince ||
      !data.nameClinic ||
      !data.addressClinic ||
      !data.note
    ) {
      return {
        errCode: 1,
        message: "Missing required params!",
      };
    } else {
      if (data.hasOldData) {
        let doctor = await db.Markdown.findOne({
          where: { doctorId: id },
        });
        if (doctor) {
          doctor.contentHTML = data.contentHTML;
          doctor.contentMarkdown = data.contentMarkdown;
          doctor.description = data.description;
          await doctor.save();
        }
      } else {
        await db.Markdown.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          doctorId: id,
        });
      }

      let doctorInfo = await db.Doctor_Info.findOne({
        where: {
          doctorId: id,
        },
        raw: false,
      });

      if (doctorInfo) {
        //update
        doctorInfo.priceId = data.selectedPrice;
        doctorInfo.paymentId = data.selectedPayment;
        doctorInfo.provinceId = data.selectedProvince;
        doctorInfo.note = data.note;
        doctorInfo.addressClinic = data.addressClinic;
        doctorInfo.nameClinic = data.nameClinic;
        await doctorInfo.save();
      } else {
        //create
        await db.Doctor_Info.create({
          doctorId: id,
          priceId: data.selectedPrice,
          paymentId: data.selectedPayment,
          provinceId: data.selectedProvince,
          note: data.note,
          addressClinic: data.addressClinic,
          nameClinic: data.nameClinic,
        });
      }

      return {
        errCode: 0,
        message: "ok",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDetailDoctor = async (id) => {
  try {
    if (!id) {
      return {
        errCode: 1,
        message: "Missing required params!",
      };
    } else {
      let doctor = await db.User.findOne({
        where: {
          id,
          roleId: "R2",
        },
        attributes: {
          exclude: ["password", "updatedAt", "createdAt"],
        },
        include: [
          {
            model: db.Markdown,
            attributes: [
              "doctorId",
              "description",
              "contentMarkdown",
              "contentHTML",
            ],
          },

          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: false,
        nest: true,
      });

      if (doctor) {
        if (doctor.image) {
          doctor.image = new Buffer(doctor.image, "base64").toString("binary");
        }
        return {
          errCode: 0,
          message: "ok",
          data: doctor,
        };
      } else {
        return {
          errCode: 1,
          message: "No doctor exist!",
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const bulkCreateSchedule = async (data) => {
  try {
    if (!data) {
      return {
        error: 1,
        message: "Missing required params!",
      };
    } else {
      let schedule = data;
      if (schedule && schedule.length > 0) {
        schedule = schedule.map((item) => {
          item.maxNumber = MAX_NUMBER_PATIENTS;
          return item;
        });

        let existing = await db.Schedule.findAll({
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return (
            a.timeType === b.timeType &&
            a.date === b.date &&
            a.doctorId === b.doctorId
          );
        });

        if (toCreate && toCreate.length > 0) {
          console.log("last create: ", toCreate);
          await db.Schedule.bulkCreate(toCreate);
        }

        return {
          errCode: 0,
          message: "ok",
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getScheduleByDateDoctor = async (doctorId, date) => {
  try {
    if (!doctorId || !date) {
      return {
        errCode: 1,
        message: "Missing required params!",
      };
    } else {
      let data = await db.Schedule.findAll({
        where: { doctorId, date },
        include: [
          {
            model: db.Allcode,
            as: "timeTypeData",
            attributes: ["valueVI", "valueEN"],
          },
        ],
        raw: false,
        nest: true,
      });

      if (!data) {
        data = [];
      }

      return {
        errCode: 0,
        message: "OK",
        data,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
