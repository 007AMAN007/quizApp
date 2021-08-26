import React, { Component } from "react"
import { Provider } from "react-redux"
import App from "../components/quizcreate/App"
import store from "../components/quizcreate/store"
import { Link, graphql } from "gatsby"

class QuizAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
    }
  }

  setResult = values => {
    this.setState({
      result: JSON.stringify(values, null, 2),
    })
  }

  render() {
    return (
      <div>
        <Link to="/" className="goHomeLink">
          Go Home
        </Link>
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    )
  }
}

export default QuizAdd
