import React, { Component } from "react";
import { loader } from "graphql.macro";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { Query } from "react-apollo";
import { users } from "./__generated__/users";

const query = loader("./Query.graphql");

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.REACT_APP_SERVER_URI,
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>Hej</div>
        <ul>
          <Query<users> query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return "Loading...";
              } else if (error || !data) {
                return "Error";
              } else {
                return data.users.map((user: any) => (
                  <li key={user.id}>{user.name}</li>
                ));
              }
            }}
          </Query>
        </ul>
      </ApolloProvider>
    );
  }
}

export default App;
