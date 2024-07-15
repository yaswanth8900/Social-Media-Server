const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Users {
    fname: String!
    lname: String!
    username: String!
    phone: Int!
    email: String!
    password: String!
  }

  type Query {
    getUsers(username: String): Users
    getAllUsers: [Users]
  }

  input CreateUserInput {
    fname: String!
    lname: String!
    username: String!
    phone: Int!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): Users
    changePass(username: String!, password: String!): Users
  }

`;

module.exports = typeDefs;
  