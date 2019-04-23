import { Resolvers } from "../generated/graphqlgen";

import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { User } from "./User";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  User
};
