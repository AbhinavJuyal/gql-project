const { gql } = require("apollo-server");

const typeDefs = gql`
  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    username: String!
    email: String!
    phone: String!
    company: Company
    friends: [User!]
    nationality: Nationality!
    favouriteMovies: [Movie!]
  }
  type Movie {
    id: ID!
    name: String!
    yearOfRelease: String!
  }
  type Query {
    users: [User!]!
    # users: UsersResult!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }
  input CreateUserInput {
    name: String!
    username: String!
    email: String!
    phone: String!
    age: Int!
    nationality: Nationality = INDIA
  }
  input UpdateUserNameInput {
    id: ID!
    username: String!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUserName(input: UpdateUserNameInput!): [User!]
    deleteUser(id: ID!): [User!]
  }
  enum Nationality {
    INDIA
    CZECH
    DUBAI
    BRAZIL
    USA
    GERMANY
  }
  #  type UsersSuccess {
  #    users: [User!]!
  #  }
  #  type UsersError {
  #    error: String!
  #  }
  #  union UsersResult = UsersSuccess | UsersError
`;

module.exports = { typeDefs };
