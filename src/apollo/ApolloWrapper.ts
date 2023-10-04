import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_HASURA_URL,
    headers: {
      "content-type": "application/ json",
      "x-hasura-admin-secret": import.meta.env.VITE_HASURA_KEY,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only", // Used for first execution
      nextFetchPolicy: "network-only",
    },
  },
});

export { client };