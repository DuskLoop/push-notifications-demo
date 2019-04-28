import { Resolvers } from "../generated/graphqlgen";

import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { User } from "./User";
import { GraphQLJSON, GraphQLJSONObject } from "graphql-type-json";

export const resolvers: any = {
  Query,
  Mutation,
  User,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
};
