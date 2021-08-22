const connection = require("serverless-mysql")({
  config: {
    host: "sql6.freemysqlhosting.net",
    database: "sql6431929",
    user: "sql6431929",
    password: "EE5PiuZ7uH",
  },
})

exports.handler = async function (event) {
  const { email, password } = JSON.parse(event.body)

  try {
    await connection.connect()
    existUserResult = await getUserDetail(connection, email, password)

    if (!existUserResult[0]) {
      await connection.end()
      return {
        statusCode: 200,
        body: JSON.stringify({
          error: "1",
          message: "Forkert email eller password",
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
}

async function getUserDetail(connection, email, password) {
  return new Promise((resolve, reject) => {
    connection.query(
      {
        sql: "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?",
        timeout: 10000,
        values: [email, password],
      },
      function (error, results, fields) {
        if (error) reject(err)
        resolve(results)
      }
    )
  })
}
