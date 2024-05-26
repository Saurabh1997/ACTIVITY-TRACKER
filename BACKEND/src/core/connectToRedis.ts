import { createClient } from "redis";

class RedisConnector {
  client: any;

  setClientConnect(client: any) {
    this.client = client;
  }

  getClientConnect() {
    return this.client;
  }

  async connectToRedis() {
    const client = await createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    // await client.set('key', 'saurabh');
    // const value = await client.get('key');
    // console.log(" key ", value)
    this.setClientConnect(client);
  }
}

const redisClient = new RedisConnector();

export default redisClient;
