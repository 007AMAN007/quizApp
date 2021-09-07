const connection = require("serverless-mysql")({
  config: {
    host: "sql6.freesqldatabase.com",
    database: "sql6435212",
    user: "sql6435212",
    password: "HthzFaPRWW",
  },
})

exports.handler = async function (event) {
  const { jsonResult, user, quizId } = JSON.parse(event.body)
  console.log(jsonResult)
  try {
    await connection.connect()
    await updateQuiz(connection, jsonResult, quizId)
    await connection.end()
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: "0",
        message: "Quiz updated successfully navigating to dashboard",
      }),
    }
  } catch (e) {
    console.log(`Not signup due to error= ${e}`)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      error: "0",
      message: "User logged in",
    }),
  }
}

async function updateQuiz(connection, jsonResult, quizId) {
  return new Promise((resolve, reject) => {
    connection.query(
      {
        sql: "UPDATE quizs SET quiz = ? WHERE id = ?",
        timeout: 10000,
        values: [jsonResult, quizId],
      },
      function (error, results, fields) {
        if (error) reject(err)
        resolve(results)
      }
    )
  })
}
