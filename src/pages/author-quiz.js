import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"

const BlogAuthorQuiz = ({ data, location }) => {
  return (
    <Layout location={location}>
      <Seo title="Author Quiz" />
      <div>Author Quiz</div>
    </Layout>
  )
}

export default BlogAuthorQuiz
