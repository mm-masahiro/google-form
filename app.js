// Import dependencies
const fs = require("fs");
const { google } = require("googleapis");
const http = require('http');

const dotEnv = require('dotenv').config();

const service = google.sheets("v4");

// Configure auth client
const authClient = new google.auth.JWT(
	// credentials.client_email,
	process.env.CLIENT_EMAIL,
	null,
	process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
	["https://www.googleapis.com/auth/spreadsheets"]
);

const create_answer_json = async () => {
	try {

		// Authorize the client
		const token = await authClient.authorize();

		// Set the client credentials
		authClient.setCredentials(token);

		const before_answers = fs.readFileSync('./answers.json', 'utf-8');
		const before_answers_count = JSON.parse(before_answers).length;

		// Get the rows
		// 1日に2回くらいcronで定期実行させる
		const res = await service.spreadsheets.values.get({
			auth: authClient,
			spreadsheetId: "1r59N6wuaaW4Ue4heIyoXp3oafpLkz2lqVB5VTmsWPc0",
			range: "A:G",
		});

		// All of the answers
		const answers = [];

		// Set rows to equal the rows
		const rows = res.data.values;

		// Check if we have any data and if we do add it to our answers array
		if (rows.length) {

			// Remove the headers
			rows.shift()

			// For each row
			for (const row of rows) {
				answers.push({ timeStamp: row[0], answer1: row[1],  answer2: row[2], answer3: row[3], answer4: row[4], repositoryName: row[5], title: row[6]});
			}

		} else {
			console.log("No data found.");
		}

		// Saved the answers
		fs.writeFileSync("answers.json", JSON.stringify(answers), function (err, file) {
			if (err) throw err;
			console.log("Saved!");
		});
		
		// lengthが違ったら実行させる
		if (before_answers_count !== answers.length) {
			const creaet_issue = require('./create_issue');
		}

	} catch (error) {

		// Log the error
		console.log(error);

		// Exit the process with error
		process.exit(1);

	}
}

const server = http.createServer(function(req, res) {
	create_answer_json();
	res.end('success')
}).listen(3030);
