import { makeExecutableSchema } from 'graphql-tools';
import Links from './connectors';


const typeDefs = [`
  type Link {
    id: Int
    title:String
    dateAdded: String
    userId: String
    url: String
    imageUrl: String
  }


  type Pingui {
    message: String
  }

  type Query {
    hello: String
    ping(message: String!): Pingui
    links(type: String!): [Link]
    allLinks: [Link]
  }

  type Mutation {
    addLink(type: String!, label: String!): Link
  }

  type Subscription {
    LinkAdded(type: String!): Link
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`];

const resolvers = {
  Query: {
    hello(root, args, context) {
      return "Hello world!";
    },
    ping(root, { message }, context) {
      return {
        message: `Answering ${message}`
      };
    },
    allLinks(root, args, context) {
      console.log("allLinks")
      return Links.getAll();
    },
    links(root, { type }, context) {
      console.log("getLinks")
      return Links.getLinks(type);
    },
  },
  Mutation: {
    addLink: async (root, { type, label }, context) => {
      console.log(`adding ${type} Link '${label}'`);
      const newLink = await Links.addLink(type, label);
      return newLink;
    },
  },

};

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default jsSchema;
