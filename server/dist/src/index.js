"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_client_1 = require("../generated/prisma-client");
var graphql_yoga_1 = require("graphql-yoga");
var resolvers_1 = require("./resolvers");
var context = { prisma: prisma_client_1.prisma };
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers: resolvers_1.resolvers,
    context: context
});
server.start(function (_a) {
    var endpoint = _a.endpoint;
    return console.log("Server successfully started!", endpoint);
});
//# sourceMappingURL=index.js.map