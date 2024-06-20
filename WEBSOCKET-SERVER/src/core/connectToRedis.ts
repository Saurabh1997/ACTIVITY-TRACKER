import { RedisClientType, createClient } from "redis";

export default class RedisConnector {
  private client: RedisClientType;
  private static redisInstance: RedisConnector;

  private constructor() {
    this.client = createClient();
  }

  public static getClientInstance() {
    if (RedisConnector.redisInstance) {
      return RedisConnector.redisInstance;
    } else {
      RedisConnector.redisInstance = new RedisConnector();
      return RedisConnector.redisInstance;
    }
  }

  // async connectToRedis() {
  //   const Redisclient = await createClient()
  //     .on("error", (err) => console.log("Redis Client Error", err))
  //     .connect();

  //   // await client.set('key', 'saurabh');
  //   // const value = await client.get('key');
  //   // console.log(" key ", value)
  //   this.setClientConnect(Redisclient);
  // }

  public pushToQueue = async (queueName: string, queueData: any) => {
    await this.client.lPush(queueName, queueData);
  };

  public setCacheKey = async (key: string, value: string) => {
    await this.client.set(key, value);
  };

  public getCacheKey = async (key: string) => {
    const value = await this.client.get(key);
    return value;
  };

  public pullFromQueue = async (queueName: string) => {
    const data = await this.client.brPop(queueName, 0);
    console.log(" data ", data);
    return JSON.parse(data.element);
  };
}
