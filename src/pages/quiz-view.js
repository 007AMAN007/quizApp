import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { navigate } from "gatsby"
import Quiz from "react-quiz-component"
import Layout from "../components/layout"
import Seo from "../components/seo"

const QuizView = ({ data, location }) => {
  const [quizJson, setQuizJson] = useState("")
  const [resultLoaded, setResultLoaded] = useState(false)

  useEffect(async () => {
    const pathname = location.pathname
    const quizId = pathname.split("/")[2]
    console.log("quizId = " + quizId)
    if (quizId) {
      await fetch("/.netlify/functions/get-quiz", {
        method: "POST",
        body: JSON.stringify({ quizId }),
      })
        .then(async response => response.json())
        .then(async responseJson => {
          setResultLoaded(true)
          setQuizJson(JSON.parse(responseJson.quizDetails[0].quiz))
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      navigate("/")
    }
  }, [])

  return (
    <Layout location={location}>
      <Seo title="Quiz" />
      {quizJson && resultLoaded ? (
        <Quiz quiz={quizJson} />
      ) : resultLoaded ? (
        <h5>Quiz not found</h5>
      ) : (
        <h5>Loading...</h5>
      )}
    </Layout>
  )
}

export default QuizView
