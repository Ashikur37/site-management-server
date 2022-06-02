"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
    type Query{
        users:[User]
        messagesByUser(receiverId:Int!):[Message]
    }
    input NamePasswordInput {
        name:String!
        email:String!
        password:String!
    }
    input UserSigninInput {
        email:String!
        password:String!
    }
    scalar Date
    type Message{
        id:ID!
        text:String
        receiverId:Int!
        senderId:Int!
        createdAt:Date
    }
    type Token{
        token:String!
        
    }
    type Mutation{
        signup(options:UserInput!):Token
        
    }
   
    
`;
exports.default = typeDefs;
//# sourceMappingURL=type_defs.js.map