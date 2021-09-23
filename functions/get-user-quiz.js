const connection = require("serverless-mysql")({
  config: {
    host: "eu-cdbr-west-01.cleardb.com",
    database: "heroku_83ebbebfd8a5ac5",
    user: "bc0f17bcbfd784",
    password: "30bf5575",
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
