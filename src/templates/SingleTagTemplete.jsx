import React from "react";
import { Link } from "gatsby";

const SingleTagTemplate = ({ pageContext }) => {
  const { tag, posts } = pageContext;
  return (
    <div>
      <p>{tag}</p>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={index}>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SingleTagTemplate;
