// Import dependencies
const fs = require("fs");
const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("./credentials.json");

// Configure auth client
const authClient = new google.auth.JWT(
	credentials.client_email,
	null,
	credentials.private_key.replace(/\\n/g, "\n"),
	["https://www.googleapis.com/auth/spreadsheets"]
);

(async function () {
	try {

		// Authorize the client
		const token = await authClient.authorize();

		// Set the client credentials
		authClient.setCredentials(token);

		// Get the rows
		const res = await service.spreadsheets.values.get({
			auth: authClient,
			spreadsheetId: "1r59N6wuaaW4Ue4heIyoXp3oafpLkz2lqVB5VTmsWPc0",
			range: "A:F",
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
					answers.push({ timeStamp: row[0], answer1: row[1],  answer2: row[2], answer3: row[3], answer4: row[4], repositoryName: row[5]});
			}

		} else {
			console.log("No data found.");  
		}

		// Saved the answers
		fs.writeFileSync("answers.json", JSON.stringify(answers), function (err, file) {
			if (err) throw err;
			console.log("Saved!");
		});

	} catch (error) {

		// Log the error
		console.log(error);

		// Exit the process with error
		process.exit(1);

	}

})();
