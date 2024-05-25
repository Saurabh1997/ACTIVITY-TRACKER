import { OK } from "zod";
import { prismaClient } from "../core/connectPostgres";

export const InsertEntryThroughPrisma = async () => {
  try {
    const result = await prismaClient.users.create({
      data: {
        email: "gap918@gmail.com",
        firstName: "gaurav patil",
        lastName: "patil",
        password: "2938",
        mobile_number: "9810101288",
        profile_pic: "12039393.jpg",
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
