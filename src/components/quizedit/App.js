import React, { Component } from "react"
import QuizForm from "./QuizForm"
import QuizFormResult from "./QuizFormResult"
import Cookies from "universal-cookie"
import { navigate } from "gatsby"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      message: null,
    }
  }

  setResult = async values => {
    const cookies = new Cookies()
    const jsonResult = JSON.stringify(values, null, 2)
    const user = cookies.get("quizLoggedInUser")
    const quizId = this.props.quizId
    console.log(quizId)
    await fetch("/.netlify/functions/edit-quiz", {
      method: "POST",
      body: JSON.stringify({ jsonResult, user, quizId }),
    })
      .then(async response => response.json())
      .then(async responseJson => {
        if (responseJson.error == 0) {
          this.setState({
            result: jsonResult,
            message: responseJson.message,
          })
          alert(responseJson.message)
          //setTimeout(function () {
          navigate("/admin")
          //}, 3000)
        } else {
          this.setState({
            result: "",
            message: responseJson.message,
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className="App">
        <QuizForm quizJson={this.props.quizJson} onSubmit={this.setResult} />
        <QuizFormResult
          result={this.state.result}
          message={this.state.message}
        />
      </div>
    )
  }
}

export default App
