import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"
import Cookies from "universal-cookie"

const BlogLogin = ({ data, location }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [messageColor, setMessageColor] = useState("")
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const cookies = new Cookies()
    if (cookies.get("quizLoggedInUser")) {
      setShowPage(false)
      window.location.href = "/authorquiz"
    } else {
      setShowPage(true)
    }
  }, [])

  function validateForm() {
    return email.length > 0 && password.length > 0
  }
  async function handleSubmit(event) {
    event.preventDefault()
    setMessage("")
    setShowMessage(false)
    setIsFormSubmitted(true)
    if (password.length < 6) {
      setMessageColor("red")
      setMessage("Password should be greater than six characters.")
      setShowMessage(true)
      setIsFormSubmitted(false)
      return
    }
    const cookies = new Cookies()
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
          await cookies.set("quizLoggedInUser", email, {
            path: "/",
            maxAge: 31536000,
          })
          window.location.href = "/authorquiz"
        }
        setShowMessage(true)
      })
      .catch(error => {
        console.error(error)
      })
  }
  return showPage ? (
    <Layout location={location}>
      <Seo title="Login" />
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h1 className="page-title">Login</h1>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control loginInput"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isFormSubmitted}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control loginInput"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              maxLength="12"
              disabled={isFormSubmitted}
            />
          </div>

          <button
            type="submit"
            disabled={!validateForm() || isFormSubmitted}
            className="btn btn-primary loginButton"
          >
            Log ind
          </button>
          {showMessage ? (
            <p className="message" style={{ color: messageColor }}>
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </Layout>
  ) : null
}

export default BlogLogin
