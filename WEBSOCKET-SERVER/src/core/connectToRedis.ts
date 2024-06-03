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
    const Redisclient = await createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    // await client.set('key', 'saurabh');
    // const value = await client.get('key');
    // console.log(" key ", value)
    this.setClientConnect(Redisclient);
  }

  async pushToQueue(queueName: string, queueData: any) {
    const clientConnector = this.getClientConnect();
    await clientConnector.lPush(queueName, queueData);
  }

  async pullFromQueue(queueName: string) {
    const clientConnector = this.getClientConnect();
    const data = await clientConnector.brPop(queueName, 0);
    console.log(" data ", data);
    return JSON.parse(data.element);
  }
}

const redisClient = new RedisConnector();

export default redisClient;
