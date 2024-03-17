import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

const app = express();
app.use(express.json());

const emailSchema = z.string();
app.get(
  "/check",
  (req: { body: { email: any } }, res: { send: (arg0: any) => void }) => {
    const emailCheck = emailSchema.safeParse(req.body.email);
    res.send(emailCheck);
  }
);

const connectPostgresDB = async () => {
  // const client = new Client({
  //   connectionString:
  //     "postgresql://postgres:secretpassword@0.0.0.0/dev_connect",
  // });
  // await client.connect();
  // const result = await client.query(`CREATE TABLE dev_users (
  //   pk_user_id SERIAL PRIMARY KEY,
  //   username VARCHAR(50) UNIQUE NOT NULL,
  //   name VARCHAR(50) NOT NULL,
  //   email VARCHAR(50) UNIQUE NOT NULL,
  //   CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  // ) `);
  // THIS DIRECT QUERIES CAN CAUSE SQL INJECTIONS AS WE ARE DIRECTLY INSERTING.
  // const result = await client.query(`INSERT INTO dev_users (
  //     username,
  //     name ,
  //     email
  //   ) VALUES ('saurabh123', 'Saurabh Patil', 'patil@gmail.com')`);
  // Instead use parameterized queries.. -
  // const insertQuery = `INSERT INTO dev_users (
  //       username,
  //       name ,
  //       email
  //     ) VALUES ($1, $2, $4)`;
  // const Values = ["gauravgap123", "gaurav patil", "gap123@gmail.com"];
  // const result = await client.query(insertQuery, Values);
};

const InsertEntryThroughPrisma = async () => {
  const result = await prismaClient.users.create({
    data: {
      email: "gap0@gmail.com",
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
};

const UpdateThroughPrisma = async () => {
  const result = await prismaClient.users.update({
    where: {
      email: "gap0@gmail.com",
    },
    data: {
      firstName: "gaurav ashok patil",
    },
  });
};

connectPostgresDB();
UpdateThroughPrisma();
// InsertEntryThroughPrisma();

app.listen(4040, () => {
  console.log(" running on port");
});
