const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    isAdmin: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Profile {
    id: ID!
    user: User!
    company: String
    location: String
    status: String!
    skills: [String!]!
    githubUsername: String
  }

  type Query {
    hello: String
    getProfiles: [Profile!]!
    getProfileByUserId(userId: ID!): Profile
    getCurrentProfile: Profile
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(name: String!, email: String!, password: String!, isAdmin: Boolean): AuthPayload!
    createProfile(company: String, location: String, status: String!, skills: [String!]!, githubUsername: String): Profile!
    updateProfile(company: String, location: String, status: String, skills: [String!], githubUsername: String): Profile!
  }
`;

export default typeDefs;
