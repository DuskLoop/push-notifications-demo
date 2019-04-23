import { QueryResolvers } from "../generated/graphqlgen";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  users: (parent, args, ctx) => {
    return ctx.prisma.users();
  }
};
