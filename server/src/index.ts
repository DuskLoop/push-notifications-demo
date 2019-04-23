import { prisma } from "../generated/prisma-client";
import { ApolloServer } from "apollo-server";
import { Context } from "./types";
import { resolvers } from "./resolvers";
import { importSchema } from "graphql-import";

const context: Context = { prisma };

const typeDefs = importSchema("./schema.graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context
});
server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
