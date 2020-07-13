import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { CREATE_POST, GET_POSTS, LOGIN } from "./queries.js";

const backendLogin = async (
  loginMutation,
  getAccessToken,
  client,
  user,
  setIsLoading
) => {
  try {
    const opts = {
      redirectUri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: "openid email profile update:posts",
    };
    const accessToken = await getAccessToken(opts);

    client.writeData({ data: { accessToken: accessToken } });
  } catch (e) {
    console.log(e.message);
  }

  const variables = {
    variables: { id: user.sub, name: user.name, avatar: user.picture },
  };
  loginMutation(variables);

  setIsLoading(false);
};

const CreatePost = ({ setIsSubmitted }) => {
  const { user, getAccessTokenWithPopup } = useAuth0();
  const client = useApolloClient();
  const [isLoading, setIsLoading] = React.useState(true);
  const [titleValue, setTitleValue] = React.useState("");
  const [contentsValue, setContentsValue] = React.useState("");
  const [submitEnabled, setSubmitEnabled] = React.useState(false);

  const handleTitleChanged = (e) => {
    setTitleValue(e.target.value);
  };

  const handleContentsChanged = (e) => {
    setContentsValue(e.target.value);

    if (e.target.value.trim() === "") {
      setSubmitEnabled(false);
    } else {
      setSubmitEnabled(true);
    }
  };

  const [login] = useMutation(LOGIN);
  React.useEffect(() => {
    backendLogin(login, getAccessTokenWithPopup, client, user, setIsLoading);
  }, [login, getAccessTokenWithPopup, client, user, setIsLoading]);

  const [createPost] = useMutation(CREATE_POST);
  const handleCreatePost = () => {
    const updateCache = (cache, { data: { createPost } }) => {
      const { posts } = cache.readQuery({ query: GET_POSTS });
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.concat([createPost]) },
      });
      setIsSubmitted(true);
    };
    const variables = {
      variables: { id: user.sub, title: titleValue, contents: contentsValue },
      update: updateCache,
    };
    createPost(variables);
    setTitleValue("");
    setContentsValue("");
  };

  return isLoading ? (
    <div className="content has-text-centered">
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  ) : (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={user.picture} alt="Your avatar" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p className="has-text-centered">
            Posting as <strong>{user.name}</strong>
          </p>
        </div>
        <div className="field">
          <input
            id="titleInput"
            className="input is-info is-focused is-rounded"
            type="text"
            placeholder="Comment title..."
            value={titleValue}
            onChange={(e) => handleTitleChanged(e)}
          />
        </div>
        <hr />
        <div className="field">
          <textarea
            id="contentsInput"
            className="textarea is-info is-rounded"
            type="text"
            placeholder="Comment body..."
            value={contentsValue}
            onChange={(e) => handleContentsChanged(e)}
          />
        </div>
        <nav className="level">
          <div className="level-right">
            <div className="level-item">
              <button
                className="button is-primary is-rounded"
                onClick={handleCreatePost}
                disabled={!submitEnabled}
              >
                <strong>Submit</strong>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </article>
  );
};

export default CreatePost;
