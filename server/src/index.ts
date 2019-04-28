import { prisma } from "../generated/prisma-client";
import { ApolloServer } from "apollo-server-express";
import { Context } from "./types";
import { resolvers } from "./resolvers";
import { importSchema } from "graphql-import";
import * as express from "express";
import { createServer } from "http";
import * as webpush from "web-push";
import { log } from "util";

const context: Context = { prisma };

const typeDefs = importSchema("./schema.graphql");

const app = express();

app.set("view engine", "pug");

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context
});

app.get("/", async function(req, res) {
  const subscriptions = await prisma
    .user({ id: "cjryw0lfa00040861rzkody34" })
    .subscriptions();

  const options = {
    vapidDetails: {
      subject: "https://developers.google.com/web/fundamentals/",
      publicKey:
        "BGjZFd-ip3g-r6TQ7Rxkt89KW3LpOUQ7dNyP2h0_ZFEXL1mrk0-p6qE-sPWUPpEHA8VoGrs3rK2vdNKFjsCN1w4",
      privateKey: "ZuNb2o86qa26X32KU6pKgMrwtXoAMLjIXqB1gNoeZTY"
    }
  };

  webpush
    .sendNotification(subscriptions[0], "Your Push Payload Text", options)
    .then(res => {
      console.log("Success: ", res);
    })
    .catch(e => {
      console.log("Error: ", e.message);
    });

  res.render("index", {
    title: "Hey",
    message: "Hello there!"
  });
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at ${server.graphqlPath}`);
});
