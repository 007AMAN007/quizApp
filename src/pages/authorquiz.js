import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"
import Cookies from "universal-cookie"

const BlogAuthorQuiz = ({ data, location }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const cookies = new Cookies()
  useEffect(async () => {
    //const cookies = new Cookies()
    if (!cookies.get("quizLoggedInUser")) {
      console.log(
        "in authorquiz if => quizLoggedInUser = " +
          cookies.get("quizLoggedInUser")
      )
      window.location.href = "/login"
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
    window.location.href = "/login"
  }
  return isUserLoggedIn ? (
    <Layout location={location}>
      <Seo title="Author Quiz" />
      <div>Author Quiz</div>
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

export default BlogAuthorQuiz
