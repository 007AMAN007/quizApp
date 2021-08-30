const connection = require("serverless-mysql")({
  config: {
    host: "remotemysql.com",
    database: "hDJ7aQHQ1t",
    user: "hDJ7aQHQ1t",
    password: "3XNoYKdivk",
  },
})

exports.handler = async function (event) {
  const { jsonResult, user } = JSON.parse(event.body)
  console.log(jsonResult)
  try {
    await connection.connect()
    var newQuiz = {
      quiz: jsonResult,
      userid: user,
    }
    var query = await connection.query({
      sql: "INSERT INTO quizs SET ?",
      timeout: 20000,
      values: [newQuiz],
    })
    await connection.end()
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: "0",
        message: "Quiz created successfully navigating to dashboard",
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
