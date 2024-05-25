import { createClient } from "redis";

export const connectToRedis = async () => {
  const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

    await client.set('key', 'saurabh');
    const value = await client.get('key');
    console.log(" key ", value)
  return client;
};
