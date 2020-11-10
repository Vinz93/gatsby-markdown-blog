const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve("src/templates/blogPost.jsx");

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date }) {
        nodes {
          frontmatter {
            path
          }
        }
      }
    }
  `);

  const posts = result?.data?.allMarkdownRemark?.nodes;

  if (posts) {
    posts.forEach((post, index) => {
      const { path } = post.frontmatter;
      createPage({
        path,
        component: blogPostTemplate,
        context: {
          pathSlug: path,
          prev: index === 0 ? null : posts[index - 1].frontmatter.path,
          next:
            index >= posts.length - 1
              ? null
              : posts[index + 1].frontmatter.path,
        },
      });
    });
  }
};
