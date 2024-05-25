import express from "express";
import { z } from "zod";
import { InsertEntryThroughPrisma } from "./subscribers/userSubscriber";
import { connectPostgresDB } from "./core/connectPostgres";

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

connectPostgresDB();
// InsertEntryThroughPrisma();

app.get("/signup", (req, res) => {
  InsertEntryThroughPrisma();
});

app.listen(4040, () => {
  console.log(" running on port");
});
