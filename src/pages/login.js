import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"

const BlogLogin = ({ data, location }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [messageColor, setMessageColor] = useState("")
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  function validateForm() {
    return email.length > 0 && password.length > 0
  }
  async function handleSubmit(event) {
    event.preventDefault()
    setShowMessage(false)
    setIsFormSubmitted(true)
    if (password.length < 6) {
      setMessageColor("red")
      setMessage("Password længde skal være mindst seks.")
      setShowMessage(true)
      setIsFormSubmitted(false)
      return
    }
    await fetch("/.netlify/functions/user-login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then(async response => response.json())
      .then(async responseJson => {
        if (responseJson.error == "1") {
          setMessageColor("red")
          setMessage(responseJson.message)
          setIsFormSubmitted(false)
        } else {
          window.location.href = "/author-quiz"
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <Layout location={location}>
      <Seo title="Login" />
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h1 className="page-title">Login</h1>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Skriv email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isFormSubmitted}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Skriv password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              maxLength="12"
              disabled={isFormSubmitted}
            />
          </div>

          <button
            type="submit"
            disabled={!validateForm() || isFormSubmitted}
            className="btn btn-primary btn-color"
          >
            Log ind
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default BlogLogin
