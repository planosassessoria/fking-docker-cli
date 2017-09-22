const readline = require('readline')

const question = (ask) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve, reject) => {
    rl.question(ask, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

module.exports = {
  question
}
