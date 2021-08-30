const connection = require("serverless-mysql")({
  config: {
    host: "remotemysql.com",
    database: "hDJ7aQHQ1t",
    user: "hDJ7aQHQ1t",
    password: "3XNoYKdivk",
  },
})

exports.handler = async function (event) {
  const { email } = JSON.parse(event.body)
  let allQuizs
  try {
    await connection.connect()
    allQuizs = await getAllQuizs(connection, email)
  } catch (e) {
    console.log(`Some error while fetching = ${e}`)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      error: "0",
      allquizs: allQuizs,
    }),
  }
}

async function getAllQuizs(connection, email) {
  return new Promise((resolve, reject) => {
    connection.query(
      {
        sql: "SELECT * FROM `quizs` WHERE `userid` = ?",
        timeout: 10000,
        values: [email],
      },
      function (error, results, fields) {
        if (error) reject(err)
        resolve(results)
      }
    )
  })
}
