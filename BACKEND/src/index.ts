import express from "express";
import { z } from "zod";
import { InsertEntryThroughPrisma } from "./subscribers/userSubscriber";
import { connectPostgresDB } from "./core/connectPostgres";
import { connectToRedis } from "./core/connectToRedis";

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

// connectPostgresDB();
// InsertEntryThroughPrisma();

connectToRedis();

app.get("/signup", async (req: express.Request, res: express.Response) => {
  const response = await InsertEntryThroughPrisma();
  res.send(response);
});

app.listen(4040, () => {
  console.log(" running on port");
});
