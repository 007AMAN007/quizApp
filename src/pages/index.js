import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"
import Cookies from "universal-cookie"
import { navigate } from "gatsby"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  // if (posts.length === 0) {
  //   return (
  //     <Layout location={location} title={siteTitle}>
  //       <Seo title="All posts" />
  //       <Bio />
  //       <p>
  //         No blog posts found. Add markdown posts to "content/blog" (or the
  //         directory you specified for the "gatsby-source-filesystem" plugin in
  //         gatsby-config.js).
  //       </p>
  //     </Layout>
  //   )
  // }
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const cookies = new Cookies()
  useEffect(async () => {
    //const cookies = new Cookies()
    if (!cookies.get("quizLoggedInUser")) {
      console.log(
        "in authorquiz if => quizLoggedInUser = " +
          cookies.get("quizLoggedInUser")
      )
      //window.location.href = "/login"
      navigate("/login")
    } else {
      console.log(
        "in authorquiz else => quizLoggedInUser = " +
          cookies.get("quizLoggedInUser")
      )
      setIsUserLoggedIn(true)
    }
  }, [])
  function userLogout() {
    cookies.remove("quizLoggedInUser")
    //window.location.href = "/login"
    navigate("/login")
  }

  return isUserLoggedIn ? (
    <Layout location={location} title={siteTitle}>
      <Seo title="All Quizs" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
        })}
      </ol>
      {/* <div>Author Quiz</div> */}
      <Link to="/quizadd" className="adQuizLink">Add Quiz</Link>
      <button
        type="submit"
        onClick={userLogout}
        className="btn btn-primary btn-color"
      >
        Log out
      </button>
    </Layout>
  ) : null
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
