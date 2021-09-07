import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { navigate } from "gatsby"
import { Link, graphql } from "gatsby"
import Seo from "../components/seo"
import store from "../components/quizedit/store"
import { Provider } from "react-redux"
import App from "../components/quizedit/App"
import Cookies from "universal-cookie"

const QuizEdit = ({ data, location }) => {
  const [quizJson, setQuizJson] = useState("")
  const [stateQuizId, setStateQuizId] = useState(0)
  const [resultLoaded, setResultLoaded] = useState(false)
  const cookies = new Cookies()
  useEffect(async () => {
    const pathname = location.pathname
    const quizId = pathname.split("/")[2]
    console.log("quizId = " + quizId)
    setStateQuizId(quizId)
    const userId = cookies.get("quizLoggedInUser")
    if (quizId) {
      await fetch("/.netlify/functions/get-quiz-for-edit", {
        method: "POST",
        body: JSON.stringify({ quizId, userId }),
      })
        .then(async response => response.json())
        .then(async responseJson => {
          setResultLoaded(true)
          setQuizJson(JSON.parse(responseJson.quizDetails[0].quiz))
          console.log(JSON.parse(responseJson.quizDetails[0].quiz))
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <Seo title="Quiz Edit" />
      {quizJson ? (
        // <div>
        //   <form className="padding200">
        //     <div className="form-group marginBtm20">
        //       <label>Title</label>
        //       <input
        //         type="text"
        //         className="form-control marginBtm20"
        //         value={quizJson.quizTitle}
        //       />
        //     </div>
        //     <div className="form-group marginBtm20">
        //       <label>Synopsis</label>
        //       <textarea
        //         className="form-control"
        //         id="exampleFormControlTextarea1"
        //         rows="3"
        //       >
        //         {quizJson.quizSynopsis}
        //       </textarea>
        //     </div>
        //     <div>
        //       {quizJson.questions.map((question, index) => (
        //         <div>
        //           <div className="form-group marginBtm20">
        //             <label>Question #{index + 1}</label>
        //             <input
        //               type="text"
        //               className="form-control"
        //               value={question.question}
        //             />
        //           </div>
        //           {question.answers.map((answer, index) => (
        //             <div className="form-group marginBtm20">
        //               <label>Answer #{index + 1}</label>
        //               <input
        //                 type="text"
        //                 className="form-control"
        //                 value={question.answers[index]}
        //               />
        //             </div>
        //           ))}
        //           <div className="form-group marginBtm20">
        //             <label>Correct Answer</label>
        //             <select class="form-control" id="exampleFormControlSelect2">
        //               {question.answers.map((answer, index) => (
        //                 <option
        //                   value={index + 1}
        //                   selected={
        //                     index + 1 == question.correctAnswer
        //                       ? "selected"
        //                       : ""
        //                   }
        //                 >
        //                   {index + 1}
        //                 </option>
        //               ))}
        //             </select>
        //           </div>
        //         </div>
        //       ))}
        //     </div>
        //     <button type="submit" class="btn btn-primary">
        //       Update
        //     </button>
        //   </form>
        // </div>
        <div>
          <Link to="/admin" className="goHomeLink">
            Admin Dashboard
          </Link>
          <Provider store={store}>
            <App quizJson={quizJson} quizId={stateQuizId} />
          </Provider>
        </div>
      ) : resultLoaded ? (
        <h4>Quiz not found.</h4>
      ) : (
        <h5>Loading...</h5>
      )}
    </div>
  )
}

export default QuizEdit
