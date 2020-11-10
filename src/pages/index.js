import React from "react";
import { graphql } from "gatsby";
import Header from "../components/Header";

const Layout = ({ data }) => {
  return (
    <div>
      <Header />
      {data.markPages.nodes.map(page => {
        const { title, tags, path } = page.frontmatter;
        return (
          <div key={page.id}>
            <h4>{title}</h4>
            <p>path: {path}</p>
            <p>tags: {tags.join(", ")}</p>
          </div>
        );
      })}
    </div>
  );
};

export const query = graphql`
  query {
    markPages: allMarkdownRemark(sort: { fields: frontmatter___date }) {
      nodes {
        id
        frontmatter {
          title
          path
          tags
        }
      }
    }
  }
`;

export default Layout;
