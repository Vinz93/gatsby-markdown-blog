---
path: "/first-post"
date: "2020-11-01-09"
title: "From markdown to HTML"
tags: ["gatsby", "graphql", "react"]
execert: "A preview of my first post"
---

## React Gatsby and Markdown

This content is written in **markdown**
and then is transform into html

packages involved:

- gatsby-source-filesystem
- gatsby-transformer-remark

### Query your data with Graphql

```js
export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        date
        path
        tags
        title
      }
    }
  }
`;
```
