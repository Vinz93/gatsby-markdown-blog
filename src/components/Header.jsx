import React from "react"
import { StaticQuery, graphql } from "gatsby"

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
const Header = () => {
  return (
    <StaticQuery
      query={query}
      render={data => <h1>{data.site.siteMetadata.title}</h1>}
    />
  )
}

export default Header
