import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <article className="media">
        <div className="media-content">
          <div className="content has-text-centered">
            <p>
              <strong>You must be logged in to post.</strong>
            </p>
            <button
              className="button is-primary is-rounded"
              onClick={() => loginWithRedirect()}
            >
              <strong>Login</strong>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default Login;
