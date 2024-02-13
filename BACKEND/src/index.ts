const express = require("express");
const { z } = require("zod");

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

app.listen(4040, () => {
  console.log(" running on port");
});
