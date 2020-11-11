import React from "react";
import { Link } from "gatsby";

const linkStyle = {
  fontSize: 20,
  marginLeft: 5,
  color: "#663499",
};

const AllTagsTemplate = ({ data, pageContext }) => {
  const { tags } = pageContext;
  return (
    <div>
      <p>All my tags</p>
      <ul>
        {tags.map(tag => {
          return (
            <Link key={tag} to={`/tags/${tag}`} style={linkStyle}>
              {tag}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AllTagsTemplate;
