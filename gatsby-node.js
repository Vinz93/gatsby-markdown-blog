const path = require("path");

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve(
    "src/templates/AllTagsTemplate.jsx"
  );
  const singleTagIndexTemplate = path.resolve(
    "src/templates/SingleTagTemplete.jsx"
  );

  const postsByTag = {};

  posts.forEach(post => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }
        postsByTag[tag].push(post);
      });
    }
  });

  const tags = Object.keys(postsByTag);

  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: singleTagIndexTemplate,
      context: {
        tag,
        posts: postsByTag[tag],
      },
    });
  });

  createPage({
    path: "/tags",
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort(),
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve("src/templates/BlogPost.jsx");

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date }) {
        nodes {
          frontmatter {
            title
            path
            tags
          }
        }
      }
    }
  `);

  const posts = result?.data?.allMarkdownRemark?.nodes;

  createTagPages(createPage, posts);

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
