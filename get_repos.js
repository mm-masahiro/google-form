const { Octokit } = require("@octokit/rest");
const dotEnv = require('dotenv').config();
const octokit = new Octokit({auth: process.env.ACCESS_TOKEN});

const get_repos = async () => {
	const org_info = await octokit.request('GET /orgs/{org}/repos', {
		org: 'tetsu-tech'
	})
	const repos = org_info.data.map((repo) => {
		return repo.name
	})
	console.log(repos);
}

get_repos();
