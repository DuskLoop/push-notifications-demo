"use strict";
// Code generated by Prisma (prisma@1.25.7). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_client_lib_1 = require("prisma-client-lib");
var prisma_schema_1 = require("./prisma-schema");
/**
 * Model Metadata
 */
exports.models = [
    {
        name: "User",
        embedded: false
    }
];
/**
 * Type Defs
 */
exports.Prisma = prisma_client_lib_1.makePrismaClientClass({
    typeDefs: prisma_schema_1.typeDefs,
    models: exports.models,
    endpoint: "https://my-prisma-server-6370487401.herokuapp.com/"
});
exports.prisma = new exports.Prisma();
//# sourceMappingURL=index.js.map