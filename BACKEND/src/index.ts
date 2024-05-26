import express from "express";
import { z } from "zod";
import { InsertEntryThroughPrisma } from "./subscribers/userSubscriber";
import { connectPostgresDB } from "./core/connectPostgres";
import redisClient from "./core/connectToRedis";
import {
  getValueFromRedis,
  setValueToRedis,
} from "./subscribers/redisSubscriber";

const app = express();
app.use(express.json());

const startServer = async () => {
  await redisClient.connectToRedis();
  app.listen(4040, () => {
    console.log(" running on port");
  });
};

const emailSchema = z.string();
app.get(
  "/check",
  (req: { body: { email: any } }, res: { send: (arg0: any) => void }) => {
    const emailCheck = emailSchema.safeParse(req.body.email);
    res.send(emailCheck);
  }
);

// connectPostgresDB();
// InsertEntryThroughPrisma();

app.post("/signup", async (req: express.Request, res: express.Response) => {
  const response = await InsertEntryThroughPrisma(req.body);
  res.send(response);
});

app.post("/setUserID", async (req: express.Request, res: express.Response) => {
  const response = await setValueToRedis("user:name", req.body.name);
  res.send(response);
});

app.get("/getUserID", async (req: express.Request, res: express.Response) => {
  const response = await getValueFromRedis("user:name");
  console.log(" res[ ", response);
  res.send(response);
});

startServer();
