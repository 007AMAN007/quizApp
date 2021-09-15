import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { navigate } from "gatsby"
import Quiz from "react-quiz-component"
import Layout from "../components/layout"
import Seo from "../components/seo"
//react-buzzfeed-quiz
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa"

const QuizView = ({ data, location }) => {
  const [quizJson, setQuizJson] = useState("")
  const [resultLoaded, setResultLoaded] = useState(false)
  const appLocale = {
    appLocale: {
      nextQuestionBtn: <FaArrowRight />,
    },
  }

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
          const obj1 = JSON.parse(responseJson.quizDetails[0].quiz)
          const obj2 = appLocale
          var mergedObj = { ...obj1, ...obj2 }
          console.log(mergedObj)
          setResultLoaded(true)
          setQuizJson(mergedObj)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      navigate("/")
    }
  }, [])

  function renderCustomResultPage() {
    return (
      <div>
        This is a custom result page. You can use obj to render your custom
        result page
      </div>
    )
  }

  return (
    <Layout location={location}>
      <Seo title="Quiz" />
      {quizJson && resultLoaded ? (
        <Quiz
          quiz={quizJson}
          //showDefaultResult={false}
          //customResultPage={renderCustomResultPage}
          showInstantFeedback={true}
        />
      ) : resultLoaded ? (
        <h5>Quiz not found</h5>
      ) : (
        <h5>Loading...</h5>
      )}
    </Layout>
  )
}

export default QuizView
