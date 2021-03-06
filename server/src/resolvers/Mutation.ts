import { MutationResolvers } from "../generated/graphqlgen";

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createUser: (parent, args, ctx) => {
    return ctx.prisma.createUser({ name: args.name });
  },
  saveSubscription: (parent, args, ctx) => {
    return ctx.prisma.updateUser({
      where: { id: args.userId },
      data: { subscriptions: { set: args.subscription } }
    });
  }
};
