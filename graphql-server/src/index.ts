import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema.js";
import { activities, activity_documents, users } from "./db/_db.js";

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
    activity_documents() {
      return activity_documents;
    },
    activity_document(_: any, args: { id: string }) {
      return activity_documents.find(
        (activity_document) => activity_document.id === args.id
      );
    },
  },
  User: {
    activities(parent: { id: string }) {
      return activities.filter((activity) => activity.user_id === parent.id);
    },
  },
  Activity: {
    users(parent: { user_id: string }) {
      return users.filter((user) => user.id === parent.user_id);
    },
    activity_document(parent: { id: string }) {
      return activity_documents.find(
        (document) => document.activity_id === parent.id
      );
    },
  },
  // Activity_document: {
  //   users(parent: { user_id: string }) {
  //     return users.filter((user) => user.id === parent.user_id);
  //   },
  // },
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
