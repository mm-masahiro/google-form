const { Octokit } = require("@octokit/rest");
const dotEnv = require('dotenv').config();
const octokit = new Octokit({auth: process.env.ACCESS_TOKEN});
const latestAnswer = require("./answers.json").slice(-1)[0]

const create_issue = octokit.issues.create({
  owner: 'tetsu-tech',
  repo: latestAnswer.repositoryName,
  title: latestAnswer.title,
  body: `### 勉強会の雰囲気はどうでしたか？\n- ${latestAnswer.answer1}\n### 勉強会を開催してみての感想\n- ${latestAnswer.answer2}\n### 改善できそうなポイント（主催者側）\n- ${latestAnswer.answer3}\n### 参加者に「もう少しこうして欲しかった」というポイント\n- ${latestAnswer.answer4}`,
}).then(({data}) => {
  console.log(data);
}).catch(error => {
  console.log(error);
});

module.exports = create_issue;
