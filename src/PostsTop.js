import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login.js";
import CreatePost from "./CreatePost.js";
import LoadingTop from "./LoadingTop.js";

const PostsTop = ({ setIsSubmitted }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <LoadingTop />;
  }

  return isAuthenticated ? (
    <CreatePost setIsSubmitted={setIsSubmitted} />
  ) : (
    <Login />
  );
};

export default PostsTop;
