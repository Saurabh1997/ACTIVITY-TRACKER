import express from "express";
import { z } from "zod";
import { InsertEntryThroughPrisma } from "./subscribers/userSubscriber";
import { connectPostgresDB } from "./core/connectPostgres";
import RedisConnector from "./core/connectToRedis";
import { createResponseStructure } from "./utils/createResponseStructure";
import cors, { CorsOptions } from "cors";
import protobuff from "protobufjs";
import fs from "fs";

const app = express();
app.use(express.json());

let whitelist = ["http://localhost:3001"];
let corsOptions: CorsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

protobuff.load("src/sampleProto.proto", (err: any, root: any) => {
  if (err) {
    console.log(" er", err);
  }

  let loadedProto = root.lookupType("sampleProto.basicProto");
  let protoPayload = {
    id: "1",
    name: "Saurabh",
    age: 27,
  };

  // BELOW CODE IS TO VERIFY IF PAYLOAD IS ALIGNING WITH THE DEFINED PROTO FILE CONFIGURATION OR NOT.
  let errMsg = loadedProto.verify(protoPayload);
  if (errMsg) {
    console.log(" err in verification ", errMsg);
  }

  // TO CREATE A NEW MESSAGE
  let createdMsg = loadedProto.create(protoPayload);

  // to encode the message to Uint8Array or buffer
  let encodedMsg = loadedProto.encode(createdMsg).finish();

  console.log(" encodedMsg ", encodedMsg);

  fs.writeFileSync("protoFile.txt", encodedMsg);

  let decoded = loadedProto.decode(encodedMsg);

  console.log(" decode ", decoded);

  let decodedObject = loadedProto.toObject(decoded, {
    longs: String,
    enums: String,
    bytes: String,
  });
  console.log(" decoded Obj ", decodedObject);
});

const startServer = async () => {
  //  await RedisConnector.getClientInstance();

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
