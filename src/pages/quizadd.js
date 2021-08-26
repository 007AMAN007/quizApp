import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import App from "../components/quizcreate/App"
import store from "../components/quizcreate/store"
import { Link, graphql } from "gatsby"
import Cookies from "universal-cookie"
import { navigate } from "gatsby"

const QuizAdd = ({ data, location }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     result: null,
  //   }
  // }

  // setResult = values => {
  //   this.setState({
  //     result: JSON.stringify(values, null, 2),
  //   })
  // }
  const cookies = new Cookies()
  useEffect(async () => {
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

  // render() {
  return isUserLoggedIn ? (
    <div>
      <Link to="/" className="goHomeLink">
        Go Home
      </Link>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  ) : null
  //}
}

export default QuizAdd
