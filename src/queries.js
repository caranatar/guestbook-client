import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($id: String!, $name: String, $avatar: String) {
    login(id: $id, name: $name, avatar: $avatar) {
      name
      avatar
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($id: String!, $title: String, $contents: String!) {
    createPost(id: $id, title: $title, contents: $contents) {
      id
      title
      contents
      author {
        name
        avatar
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      contents
      author {
        name
        avatar
      }
    }
  }
`;

export const GET_ACCESS_TOKEN = gql`
  query GetAccessToken {
    accessToken @client
  }
`;
