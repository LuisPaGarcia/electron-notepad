const electron = require('electron');
const path = require('path');
const fs = require('fs');
// Importing dialog module using remote
const dialog = electron.remote.dialog;

var save = document.getElementById('save');
var load = document.getElementById('load');
var textArea = document.getElementById('content');

save.addEventListener('click', event => {
	var content = textArea.value;

	// Resolves to a Promise<Object>
	dialog
		.showSaveDialog({
			title: 'Select the File Path to save',
			defaultPath: path.join(__dirname, '../assets/sample.txt'),
			buttonLabel: 'Save',
			// Restricting the user to only Text Files.
			filters: [
				{
					name: 'Text Files',
					extensions: [ 'txt' ]
				}
			],
			properties: []
		})
		.then(file => {
			// Stating whether dialog operation was cancelled or not.
			console.log(file.canceled);
			if (!file.canceled) {
				console.log(file.filePath.toString());

				// Creating and Writing to the sample.txt file
				fs.writeFile(file.filePath.toString(), content, function(err) {
					if (err) throw err;
					console.log('Saved!');
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
});

load.addEventListener('click', event => {
	dialog
		.showOpenDialog({})
		.then(file => {
			// Stating whether dialog operation was cancelled or not.
			console.log(file.filePaths);
			if (!file.canceled) {
				console.log(file.filePaths[0].toString());

				var text = fs.readFileSync(file.filePaths[0].toString(), 'utf8');
				textArea.value = text.toString();
			}
		})
		.catch(err => {
			console.log(err);
		});
});
