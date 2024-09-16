export const typeDefs = `#graphql
    type User {
        Id: ID!
        name: String!
        age: Int!
        mobile_number: String!        
    }
    type Activity {
        Id: ID!
        activity_name: String!
        activity_steps: [String!]!
        user_id: String! 
        completed: Boolean! 
    }


    

    type Query {
        users: [User]
        activities: [Activity] 
    }
`;
