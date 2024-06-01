import redisClient from "../core/connectToRedis";

export const pullFromQueue = async (queueName: string) => {
  const data = await redisClient.pullFromQueue(queueName);
  return {
    status: "Data is pulled",
    data,
  };
};
