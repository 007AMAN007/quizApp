const connection = require("serverless-mysql")({
  config: {
    host: "sql6.freemysqlhosting.net",
    database: "sql6431929",
    user: "sql6431929",
    password: "EE5PiuZ7uH",
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
        message: "Quiz created successfully",
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
