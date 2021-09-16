import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  change,
} from "redux-form"
import range from "lodash/range"
import validate from "./validate"
import {
  FaExclamationCircle,
  FaPlus,
  FaTrashAlt,
  FaRegPaperPlane,
} from "react-icons/fa"

let isLoaded = 1

class QuizForm extends Component {
  constructor(props) {
    super(props)
    //this.props.change("quizTitle", "John")
  }

  renderInputField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && (
          <span>
            <FaExclamationCircle /> {error}
          </span>
        )}
      </div>
    </div>
  )

  renderTextareaField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <textarea {...input} type={type} placeholder={label} />
        {touched && error && (
          <span>
            <FaExclamationCircle /> {error}
          </span>
        )}
      </div>
    </div>
  )

  renderSelectField = ({
    input,
    label,
    type,
    meta: { touched, error },
    children,
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <select {...input}>{children}</select>
        {touched && error && (
          <span>
            <FaExclamationCircle /> {error}
          </span>
        )}
      </div>
    </div>
  )

  renderSelectQuestionTypeField = ({
    input,
    label,
    type,
    meta: { touched, error },
    children,
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <select {...input}>{children}</select>
        {touched && error && (
          <span>
            <FaExclamationCircle /> {error}
          </span>
        )}
      </div>
    </div>
  )

  renderTextAnswers = ({
    fields,
    question,
    questionIndex,
    meta: { error },
  }) => (
    <ul>
      <li>
        {/* <button type="button" onClick={() => fields.push()}>
          Add Answer
        </button> */}
      </li>
      {fields.map((answer, index) => (
        <li key={index}>
          {/* <button
            type="button"
            title="Remove Answer"
            onClick={() => fields.remove(index)}
          >
            <FaTrashAlt />
          </button> */}
          <Field
            //name={answer}
            name={`questions[${questionIndex}].answers[${index}]`}
            type="text"
            component={this.renderInputField}
            label={`Answer #${index + 1}`}
          />
        </li>
      ))}
      <li>
        <Field
          name={`questions[${questionIndex}].correctAnswer`}
          component={this.renderSelectField}
          label="Correct Answer"
        >
          <option value="">Please select correct answer</option>
          {fields.map((answer, index) => (
            <option key={index + 1} value={index + 1}>{`Answer #${
              index + 1
            }`}</option>
          ))}
        </Field>
      </li>

      {error && (
        <li className="error">
          <FaExclamationCircle /> {error}
        </li>
      )}
    </ul>
  )

  renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
      <li>
        {/* <button type="button" onClick={() => fields.push({})}>
          <FaPlus /> Add Question
        </button> */}
        {(touched || submitFailed) && error && (
          <span>
            <FaExclamationCircle /> {error}
          </span>
        )}
      </li>
      {fields.map((question, index) => (
        <li key={index}>
          {/* {question.question} */}

          {/* <button
            type="button"
            title="Remove Question"
            onClick={() => fields.remove(index)}
          >
            <FaTrashAlt />
          </button> */}
          <h4>Question #{index + 1}</h4>
          <Field
            name={`questions[${index}].question`}
            type="text"
            component={this.renderInputField}
            label="Question Title"
          />
          <Field
            name={`questions[${index}].questionType`}
            component={this.renderSelectQuestionTypeField}
            label="Question Type"
          >
            {/* <option value="">Please select a question type</option> */}
            <option value="text" selected>Text</option>
            {/* <option value="photo">Photo</option> */}
          </Field>
          <FieldArray
            name={`${question}.answers`}
            component={this.renderTextAnswers}
            question={question}
            fields={question.answers}
            questionIndex={index}
          />
          <Field
            name={`questions[${index}].messageForCorrectAnswer`}
            type="text"
            component={this.renderTextareaField}
            label="Message for Correct Answer"
          />
          <Field
            name={`questions[${index}].messageForIncorrectAnswer`}
            type="text"
            component={this.renderTextareaField}
            label="Message for Incorrect Answer"
          />
          <Field
            name={`questions[${index}].explanation`}
            type="text"
            component={this.renderTextareaField}
            label="Explanation"
          />
          {/* <Field
            name={`questions[${index}].point`}
            type="number"
            component={this.renderInputField}
            label="Point"
          /> */}
        </li>
      ))}
    </ul>
  )

  render() {
    const { handleSubmit, pristine, reset, submitting, quizJson } = this.props
    console.log(quizJson)
    if (isLoaded == 1) {
      this.props.change("quizTitle", quizJson.quizTitle)
      this.props.change("quizSynopsis", quizJson.quizSynopsis)
      for (let i = 0; i < quizJson.questions.length; i++) {
        this.props.change(
          `questions[${i}].question`,
          quizJson.questions[i].question
        )
        this.props.change(
          `questions[${i}].questionType`,
          quizJson.questions[i].questionType
        )

        this.props.change(
          `questions[${i}].correctAnswer`,
          quizJson.questions[i].correctAnswer
        )

        this.props.change(
          `questions[${i}].messageForCorrectAnswer`,
          quizJson.questions[i].messageForCorrectAnswer
        )

        this.props.change(
          `questions[${i}].messageForIncorrectAnswer`,
          quizJson.questions[i].messageForIncorrectAnswer
        )

        //questions[${index}].explanation

        this.props.change(
          `questions[${i}].explanation`,
          quizJson.questions[i].explanation
        )

        //this.props.change(`questions[${i}].point`, quizJson.questions[i].point)

        for (let j = 0; j < quizJson.questions[i].answers.length; j++) {
          this.props.change(
            `questions[${i}].answers[${j}]`,
            quizJson.questions[i].answers[j]
          )
        }
      }
      isLoaded = 0
    }

    return (
      <div className="QuizForm">
        <form name="quiz-form" id="quizCustomForm" onSubmit={handleSubmit}>
          <Field
            name="quizTitle"
            type="text"
            component={this.renderInputField}
            label="Quiz Title"
          />
          <Field
            name="quizSynopsis"
            type="text"
            component={this.renderTextareaField}
            label="Quiz Synopsis"
          />
          <FieldArray
            name="questions"
            fields={quizJson.questions}
            component={this.renderQuestions}
          />
          <div>
            <button type="submit" id="quizAddBtn" disabled={submitting}>
              <FaRegPaperPlane /> Submit
            </button>
            {/* <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button> */}
          </div>
        </form>
      </div>
    )
  }
}

QuizForm = reduxForm({
  form: "quizForm",
  validate,
})(QuizForm)

const selector = formValueSelector("quizForm")

QuizForm = connect(state => {
  const questions = selector(state, "questions")
  const questionType =
    questions && questions.map(question => question.questionType)

  return { questionType: questionType }
})(QuizForm)

export default QuizForm
