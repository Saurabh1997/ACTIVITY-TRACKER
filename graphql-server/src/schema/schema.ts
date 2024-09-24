export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        age: Int!
        mobile_number: String! 
        activity: [Activity!]       
    }
    type Activity {
        id: ID!
        activity_name: String!
        activity_steps: [String!]!
        user: User! 
        completed: Boolean! 
    }
    type Activity_Document {
        id: ID!
        activity_id: String!
        users_connected: [String!]!
        document_name: String!
        document_url: String! 
    }

    type Query {
        users: [User]
        user(id: ID!): User 
        activities: [Activity]
        activity(id: ID!): Activity 
        activity_documents: [Activity_Document]
        activity_document(id: ID!): Activity_Document 
    }
`;
