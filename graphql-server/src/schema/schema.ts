export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        age: Int!
        mobile_number: String! 
        activities: [Activity!]       
    }
    type Activity {
        id: ID!
        activity_name: String!
        activity_steps: [String!]!
        users: [User!] 
        activity_document: Activity_Document!
        completed: Boolean! 
    }
    type Activity_Document {
        id: ID!
        activities: [Activity!]
        users: [User!]!
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

    type Mutation {
        deleteActivityDocuments(id: ID!): [Activity_Document]
        deleteUsers(id: ID!):[User]
        AddUser(user:AddUserInput): [User]
        editUser(id: ID!, updatedUser: EditUserInput ): User        
    }
    input AddUserInput {
        name: String!
        age: Int!
        mobile_number: String! 
    }

    input EditUserInput {
        name: String
        age: Int
        mobile_number: String 
    }
`;


