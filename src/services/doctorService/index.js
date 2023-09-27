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
