import { RedisClientType, createClient } from "redis";

export default class RedisConnector {
  private client: RedisClientType;
  private static redisInstance: RedisConnector;

  private constructor() {
    this.client = createClient({
      password: "t3O2Fx6zRCiJIUhT9J9a0JCW2gx8Aav9",
      socket: {
        host: "redis-13365.c240.us-east-1-3.ec2.redns.redis-cloud.com",
        port: 13365,
      },
    });
    this.client.connect();
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
    return JSON.parse(data.element);
  };
}
