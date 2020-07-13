import React from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { GET_POSTS } from "./queries.js";

const Posts = () => {
  const { data, loading, error } = useQuery(GET_POSTS);
  let posts = null;

  try {
    const client = useApolloClient();
    const cacheResult = client.readQuery({ query: GET_POSTS });
    const cacheData = cacheResult["posts"];
    posts = cacheData;
  } catch (e) {
    if (data) {
      posts = data.posts;
    }
  }

  if (loading)
    return (
      <div className="has-text-centered">
        <div className="lds-circle">
          <div></div>
        </div>
      </div>
    );

  if (error) {
    console.log(JSON.stringify(error));
    return <>Error!</>;
  }

  if (!posts || (Array.isArray(posts) && posts.length === 0)) {
    return <div className="content has-text-centered">No posts yet!</div>;
  }

  return (
    <>
      {posts &&
        [...posts].reverse().map((post) => {
          const { id, title, contents, author } = post;
          const { name, avatar } = author;
          return (
            <article className="media" key={id}>
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={avatar} alt="avatar" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{title}</strong> by <strong>{name}</strong>
                    <br />
                    {contents}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
    </>
  );
};

export default Posts;
