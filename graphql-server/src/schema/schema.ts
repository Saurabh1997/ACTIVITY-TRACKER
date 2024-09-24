export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        age: Int!
        mobile_number: String!        
    }
    type Activity {
        id: ID!
        activity_name: String!
        activity_steps: [String!]!
        user_id: String! 
        completed: Boolean! 
    }


    

    type Query {
        users: [User]
        user(id: ID!): User 
        activities: [Activity]
        activity(id: ID!): Activity 
    }
`;
