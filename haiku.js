var fs = require("fs");
var syllable = require("syllable");

module.exports = {
	createHaiku: function (structure, textFile) {
		// if textFile is CMU dictionary
		if (textFile === "cmudict.txt") {
			textFile = this.readCmudictFile(textFile);
			textFile = this.formatData(textFile);
		} else {
			// if the textFile is just unsorted (by syllables) text
			textFile = this.getWords(textFile);
		}
		var finalHaiku = [];
		structure.forEach(function (line) {
			line.forEach(function (sylbs) {
				var randomPosition = function () {
					return Math.floor(Math.random() * (textFile[sylbs].length - 1 + 0 + 1) + 0);
				}
				finalHaiku.push(textFile[sylbs][randomPosition()], " ");
			})
			finalHaiku.push("\n");
		});
		console.log(finalHaiku.join(""));
	},
	readCmudictFile: function (file) {
		return fs.readFileSync(file).toString();
	},
	formatData: function (data) {
		var library = {};
		var lines = data.toString().split("\n");
		var lineSplit;
		lines.forEach(function (line) {
			lineSplit = line.split("  ");
			var word = lineSplit[0];
			var phoneme = lineSplit[1];
			if (phoneme.match(/\d/g) !== null) {
				var sylbs = phoneme.match(/\d/g).length;
				if (sylbs < 8) {
					if (!library[sylbs]) {
						library[sylbs] = [];
						library[sylbs].push(word);
					} else {
						library[sylbs].push(word);
					}
				}
			}
		});
		return library;
	},
	getWords: function (data) {
		data = this.readCmudictFile(data);
		var wordsFromBook = {};
		var booksWords = data.toString().replace(/\W|\d/g, " ").split(" ");
		for (var i = 0; i < booksWords.length; i++) {
			var sylbs = syllable(booksWords[i]);
			if (!wordsFromBook[sylbs]) {
				wordsFromBook[sylbs] = [];
				wordsFromBook[sylbs].push(booksWords[i].toUpperCase());
			} else {
				wordsFromBook[sylbs].push(booksWords[i].toUpperCase());
			}
		}
		return wordsFromBook;
	}
}
