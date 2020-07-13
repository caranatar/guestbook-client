import React from "react";

const LoadingTop = () => {
  return (
    <>
      <article className="media">
        <div className="media-content">
          <div className="content has-text-centered">
            <div className="lds-circle">
              <div></div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default LoadingTop;
