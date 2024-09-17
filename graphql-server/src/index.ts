import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema";
import { activities, users } from "./db/_db";

const resolvers = {
  Query: {
    users() {
      return users;
    },
    activities() {
      return activities;
    },
  },
};

// two properties required - typeDefs , resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloGraphqlServer = async() => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5431 },
  });
  
  console.log(" server is ready at port 5431");
}

startApolloGraphqlServer()