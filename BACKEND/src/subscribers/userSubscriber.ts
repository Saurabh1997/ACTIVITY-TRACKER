import { OK } from "zod";
import { prismaClient } from "../core/connectPostgres";

export const InsertEntryThroughPrisma = async (UserDet: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  mobile_number: string;
  profile_pic: string;
}) => {
  try {
    const result = await prismaClient.users.create({
      data: {
        email: UserDet.email,
        firstName: UserDet.firstName,
        lastName: UserDet.lastName,
        password: UserDet.password,
        mobile_number: UserDet.mobile_number,
        profile_pic: UserDet.profile_pic,
        date_of_birth: new Date(),
        CreatedDt: new Date(),
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    console.log(" result ", JSON.stringify(result));
    return {
      data: result,
      status: 200,
      msg: OK,
    };
  } catch (error) {
    console.error(error);
    return {
      data: error,
      status: 400,
      msg: error,
    };
  }
};

export const UpdateThroughPrisma = async () => {
  const result = await prismaClient.users.update({
    where: {
      email: "gap0@gmail.com",
    },
    data: {
      firstName: "gaurav ashok patil",
    },
  });
};
