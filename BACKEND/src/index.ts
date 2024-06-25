import express from "express";
import { z } from "zod";
import { InsertEntryThroughPrisma } from "./subscribers/userSubscriber";
import { connectPostgresDB } from "./core/connectPostgres";
import RedisConnector from "./core/connectToRedis";
import { createResponseStructure } from "./utils/createResponseStructure";
import cors, { CorsOptions } from "cors";

const app = express();
app.use(express.json());

let whitelist = ["http://localhost:3001"];
let corsOptions: CorsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

const startServer = async () => {
  await RedisConnector.getClientInstance();
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
  const response = await RedisConnector.getClientInstance().setCacheKey(
    "user:name",
    req.body.name
  );
  console.log(" User is set", response);
  createResponseStructure({
    res,
    status: "200",
    msg: "SUCCESS",
    data: response,
  });
});

app.get("/getUserID", async (req: express.Request, res: express.Response) => {
  const response = await RedisConnector.getClientInstance().getCacheKey(
    "user:name"
  );
  console.log(" res[ ", response);
  createResponseStructure({
    res,
    status: "200",
    msg: "SUCCESS",
    data: response,
  });
});

app.post(
  "/forgotpassword",
  async (req: express.Request, res: express.Response) => {
    const { token } = req.body;
    const ip: any = req.headers["CF-Connecting-IP"];
    let formData = new FormData();
    formData.append("secret", "0x4AAAAAAAchjNolXgHx8swqdr1ml3oFIOM");
    formData.append("response", token);
    formData.append("remoteip", ip);
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
      body: formData,
      method: "POST",
    });
    const outcome = await result.json();
    if (outcome.success) {
      createResponseStructure({
        res,
        status: "200",
        msg: "SUCCESS",
        data: "Captcha is verified",
      });
    } else {
      createResponseStructure({
        res,
        status: "400",
        msg: "Failed",
        data: "Captcha verification failed",
      });
    }
  }
);

app.post(
  "/postMessage",
  async (req: express.Request, res: express.Response) => {
    const { msg, fromUser, toUser } = req.body;
    // await pushToRedis(
    //   "chatRoom",
    //   JSON.stringify({
    //     msg,
    //     fromUser,
    //     toUser,
    //   })
    // );

    await RedisConnector.getClientInstance().pushToQueue(
      "chatRoom",
      JSON.stringify({
        msg,
        fromUser,
        toUser,
      })
    );

    createResponseStructure({
      res,
      status: "200",
      msg: "SUCCESS",
      data: "data is pushed",
    });
  }
);

app.post(
  "/publishActivityStatus",
  async (req: express.Request, res: express.Response) => {
    try {
      const { activityName, status } = req.body;
      await RedisConnector.getClientInstance().publishEvent(
        activityName,
        status
      );
      createResponseStructure({
        res,
        status: "200",
        msg: "SUCCESS",
        data: "data is published",
      });
    } catch (error) {
      console.log(" err o ", error);
      createResponseStructure({
        res,
        status: "400",
        msg: "Failed",
        data: "Data push failed",
      });
    }
  }
);

startServer();
