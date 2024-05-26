import redisClient from "../core/connectToRedis";

export const setValueToRedis = async (key: string, value: string) => {
  const client = redisClient.getClientConnect();
  await client.set(key, value);
};

export const getValueFromRedis = async (key: string) => {
  const client = redisClient.getClientConnect();
  const value = await client.get(key);
  return value;
};
