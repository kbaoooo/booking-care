import db from "../../models";

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
    if (!id || !data.contentHTML || !data.contentMarkdown) {
      return {
        errCode: 1,
        message: "Missing required params!",
      };
    } else {
      if (data.hasOldData) {
        let doctor = await db.Markdown.findOne({
          where: {doctorId: id},
        })
        if(doctor) {
          doctor.contentHTML = data.contentHTML;
          doctor.contentMarkdown = data.contentMarkdown
          doctor.description = data.description
          await doctor.save()
        }
      } else {
        await db.Markdown.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          doctorId: id,
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
