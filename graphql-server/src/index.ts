import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema.js";
import { activities, users } from "./db/_db.js";

const resolvers = {
  Query: {
    users() {
      return users;
    },
    user(_: any, args: { id: string }) {
      return users.find((user) => user.id === args.id);
    },
    activities() {
      return activities;
    },
    activity(_: any, args: { id: string }) {
      return activities.find((activity) => activity.id === args.id);
    },
  },
};

// two properties required - typeDefs , resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloGraphqlServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5431 },
  });

  console.log(" server is ready at port 5431");
};

startApolloGraphqlServer();
