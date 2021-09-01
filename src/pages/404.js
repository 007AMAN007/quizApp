// import * as React from "react"
// import { graphql } from "gatsby"

// import Layout from "../components/layout"
// import Seo from "../components/seo"

// const NotFoundPage = ({ data, location }) => {
//   const siteTitle = data.site.siteMetadata.title

//   return (
//     <Layout location={location} title={siteTitle}>
//       <Seo title="404: Not Found" />
//       <h1>404: Not Found</h1>
//       <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
//     </Layout>
//   )
// }

// export default NotFoundPage

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `

import React from "react"
import Layout from "../components/layout"
import win from "../util/win_util"

const NotFoundPage = ({ data, location }) => {
  return win ? (
    <Layout>
      <h1>You are here!</h1>
      <h2>But nothing found for you #404</h2>
    </Layout>
  ) : null
}

export default NotFoundPage
