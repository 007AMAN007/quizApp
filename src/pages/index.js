import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"
import Cookies from "universal-cookie"
import { navigate } from "gatsby"
import { FaEye, FaEdit, FaTrashAlt, FaRegPaperPlane } from "react-icons/fa"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const [allQuizs, setAllQuizs] = useState(null)

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
    if (!cookies.get("quizLoggedInUser")) {
      console.log(
        "in authorquiz if => quizLoggedInUser = " +
          cookies.get("quizLoggedInUser")
      )
      navigate("/login")
    } else {
      const email = cookies.get("quizLoggedInUser")
      await fetch("/.netlify/functions/get-user-quiz", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
        .then(async response => response.json())
        .then(async responseJson => {
          //console.log(responseJson.allquizs[0])
          // console.log(JSON.parse(responseJson.allquizs[0].quiz).quizTitle)
          setAllQuizs(responseJson.allquizs)
        })
        .catch(error => {
          console.error(error)
        })
      setIsUserLoggedIn(true)
    }
  }, [])
  function userLogout() {
    cookies.remove("quizLoggedInUser")
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
      <div className="rightFloat">
        <button
          type="submit"
          onClick={userLogout}
          className="btn btn-primary btn-color logoutBtn"
        >
          Log out
        </button>
      </div>
      <div>
        <Link to="/quizadd" className="adQuizLink">
          Add New Quiz
        </Link>
      </div>
      <table class="table quizTable">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allQuizs.map((quiz, index) => (
            <tr>
              <th scope="row">{quiz.id}</th>
              <td>{JSON.parse(quiz.quiz).quizTitle}</td>
              <td className="row">
                <a href="#" target="_blank" className="col-md-1">
                  <FaEye />
                </a>
                <a href="#" target="_blank" className="col-md-1">
                  <FaEdit />
                </a>
                <a href="#" target="_blank" className="col-md-1">
                  <FaTrashAlt />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
