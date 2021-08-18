const { Octokit } = require("@octokit/rest");
const dotEnv = require('dotenv').config();
const octokit = new Octokit({auth: process.env.ACCESS_TOKEN});
const latestAnswer = require("./answers.json").slice(-1)[0]

const parse = JSON.stringify(latestAnswer)
const hoge = JSON.parse(parse)

// console.log(hoge)

octokit.issues.create({
  owner: 'mm-masahiro',
  repo: 'google-form',
  title: process.argv[2],
  body: latestAnswer,
}).then(({data}) => {
  console.log(data);
}).catch(error => {
  console.log(error);
});

// console.log(parse)
