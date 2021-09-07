const connection = require("serverless-mysql")({
  config: {
    host: "sql6.freesqldatabase.com",
    database: "sql6435212",
    user: "sql6435212",
    password: "HthzFaPRWW",
  },
})

exports.handler = async function (event) {
  const { quizId } = JSON.parse(event.body)
  let quizDetails
  try {
    await connection.connect()
    quizDetails = await getQuizDetail(connection, quizId)
    if (quizDetails) {
      await deleteQuiz(connection, quizId)
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          error: "0",
          message: "Quiz not available",
        }),
      }
    }
    await connection.end()
  } catch (e) {
    console.log(`User not logged in due to error= ${e}`)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      error: "0",
      message: "Quiz deleted successfully",
    }),
  }
}

async function deleteQuiz(connection, quizId) {
  return new Promise((resolve, reject) => {
    connection.query(
      {
        sql: "DELETE FROM `quizs` WHERE `id` = ?",
        timeout: 10000,
        values: [quizId],
      },
      function (error, results, fields) {
        if (error) reject(err)
        resolve(results)
      }
    )
  })
}

async function getQuizDetail(connection, quizId) {
  return new Promise((resolve, reject) => {
    connection.query(
      {
        sql: "SELECT * FROM `quizs` WHERE `id` = ?",
        timeout: 10000,
        values: [quizId],
      },
      function (error, results, fields) {
        if (error) reject(err)
        resolve(results)
      }
    )
  })
}
