const { Octokit } = require("@octokit/rest");
const dotEnv = require('dotenv').config();
const octokit = new Octokit({auth: process.env.ACCESS_TOKEN});
const latestAnswer = require("./answers.json").slice(-1)[0]

const parse = JSON.stringify(latestAnswer)

console.log(latestAnswer)

octokit.issues.create({
  owner: 'mm-masahiro',
  repo: 'google-form',
  title: process.argv[2],
  // body: parse,
  body: `${latestAnswer.answer1}\n${latestAnswer.answer2}\n${latestAnswer.answer3}\n${latestAnswer.answer4}`,
}).then(({data}) => {
  console.log(data);
}).catch(error => {
  console.log(error);
});
