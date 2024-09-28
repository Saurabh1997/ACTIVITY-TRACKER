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
  Activity_Document: {
    activities(parent: { activity_id: string }) {
      return activities.filter(
        (activity) => activity.id === parent.activity_id
      );
    },
    users(parent: { activity_id: string }) {
      let Filteredactivity = activities.filter(
        (activity) => activity.id === parent.activity_id
      );
      return users.filter((user) => {
        for (let index = 0; index < Filteredactivity.length; index++) {
          return Filteredactivity[index].user_id === user.id;
        }
      });
    },
  },
  Mutation: {
    deleteActivityDocuments(_: any, args: { id: string; }){
      return activity_documents.filter((document) => document.id !== args.id) 
    },
    deleteUsers(_: any, args: { id: string; }) {
      return users.filter((user) => user.id!== args.id)
    },
    AddUser(_: any, args: any) {
    let usersArg = {
      ...args.user,
      id: Math.round(Math.random() *10000)
    }    
    users.push(usersArg)
    return users
  },
  editUser: (_: any, args: any) => {
     let Updatedusers = users.map((u) => {
        if(args.id === u.id) {
          return {...u, ...args.updatedUser}
        } 
        return u
      })
      return Updatedusers.find((u) => u.id === args.id)
    }
  }
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
