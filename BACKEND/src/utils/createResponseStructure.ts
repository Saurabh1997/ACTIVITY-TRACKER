import express from "express";

export type ResponseStructure = {
  res: express.Response;
  data: String | any;
  msg: String;
  status: String;
};

export const createResponseStructure = ({
  res,
  status,
  data,
  msg,
}: ResponseStructure) => {
  res.send({
    status,
    data,
    msg,
  });
};
