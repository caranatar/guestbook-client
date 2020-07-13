import React from "react";
import Posts from "./Posts.js";
import PostsTop from "./PostsTop.js";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { typeDefs, resolvers } from "./resolvers.js";
import { GET_ACCESS_TOKEN } from "./queries.js";
import { Auth0Provider } from "@auth0/auth0-react";
import { ApolloProvider } from "@apollo/react-hooks";
import "./css/styles.css";

const cache = new InMemoryCache();

cache.writeData({
  data: {
    accessToken: "",
  },
});

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_GUESTBOOK_BACKEND}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const data = cache.readQuery({ query: GET_ACCESS_TOKEN });
  const token = (data && data["accessToken"]) || null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  typeDefs,
  resolvers,
});

const Guestbook = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.href}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="update:posts"
    >
      <ApolloProvider client={client}>
        <div className="guestbook-content">
          {isSubmitted ? null : <PostsTop setIsSubmitted={setIsSubmitted} />}
          <Posts />
        </div>
      </ApolloProvider>
    </Auth0Provider>
  );
};

export default Guestbook;
