import { graphql, Link } from "gatsby";
import React from "react";

const BlogPost = ({ data, pageContext }) => {
  const { html, frontmatter } = data.markdownRemark;
  const { title, tags, date } = frontmatter;
  const { next, prev } = pageContext;
  return (
    <div>
      <h2
        style={{
          color: "goldenrod",
          margin: "0 5px",
        }}
      >
        {title}
      </h2>
      <p>Writen on: {date}</p>
      <p>
        <strong>tags: </strong>
        {tags.join(", ")}
      </p>
      <div className={"blog-post"} dangerouslySetInnerHTML={{ __html: html }} />
      <br />
      {prev && <Link to={prev}>Prev</Link>}{" "}
      {next && <Link to={next}>Next</Link>} <Link to={"/"}>home</Link>
    </div>
  );
};

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

export default BlogPost;
