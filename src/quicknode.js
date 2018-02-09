var Google = require('googleapis');
var Sheets = Google.sheets('v4');

function listTeams() {
  Sheets.spreadsheets.values.get({
    key: 'API_KEY',
    spreadsheetId: '1Jlj-AtNGT1-12nuvX83KTGSBY7FLMrdSXdySQOGXCm8',
    range: 'Sheet1',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    // console.log(response);
    var rows = response.data.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      rows.forEach((row) => {
        console.log(row);
      });
    }
  });
}

listTeams();