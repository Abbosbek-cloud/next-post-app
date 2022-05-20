import request, { gql } from "graphql-request";

const graphQL = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              id
              name
              bio
              photo {
                url
              }
            }
            createdAt
            shortPost
            slug
            title
            image {
              url
            }
            categories {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphQL, query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
      query GetPostDetails(){
          posts(
          orderBy: createdAt_ASC
          last: 3
        ){
          title
          image {
            url
          }
          createdAt
          slug
        }
      }
    `;

  const result = await request(graphQL, query);
  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        image {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphQL, query, { categories, slug });
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphQL, query);
  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          id
          name
          bio
          photo {
            url
          }
        }
        createdAt
        shortPost
        slug
        title
        image {
          url
        }
        categories {
          id
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphQL, query, { slug });
  return result.post;
};
