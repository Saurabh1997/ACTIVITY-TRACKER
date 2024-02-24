import express from "express";
import { z } from "zod";

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

connectPostgresDB();

app.listen(4040, () => {
  console.log(" running on port");
});
