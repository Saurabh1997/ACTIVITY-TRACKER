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
    const clientConnector = RedisConnector.getClientInstance();
    await clientConnector.client.lPush(queueName, queueData);
  };

  public setCacheKey = async (key: string, value: string) => {
    const clientConnector = RedisConnector.getClientInstance();
    await clientConnector.client.set(key, value);
  };

  public getCacheKey = async (key: string) => {
    const clientConnector = RedisConnector.getClientInstance();
    const value = await clientConnector.client.get(key);
    return value;
  };
}
