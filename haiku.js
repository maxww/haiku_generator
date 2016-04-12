var fs = require("fs");


module.exports = {
	library: {},
	createHaiku: function (structure, sylbsArr) {
		var finalHaiku = [];
		structure.forEach(function (line) {
			line.forEach(function (sylbs) {
				var randomPosition = function () {
					// if user decides to put in their own syllabels array
					if (sylbsArr) {
						return Math.floor(Math.random() * (sylbsArr[sylbs].length - 1 + 0 + 1) + 0);
					} else {
						// we can generate the poem from our words library too
						return Math.floor(Math.random() * (module.exports.library[sylbs].length - 1 + 0 + 1) + 0);
					}
				}
				if (sylbsArr) {
					finalHaiku.push(sylbsArr[sylbs][randomPosition()], " ");
				} else {
					finalHaiku.push(module.exports.library[sylbs][randomPosition()], " ");
				}

			})
			finalHaiku.push("\n");
		});
		console.log(finalHaiku.join(""));
	},
	readCmudictFile: function (file) {
		return fs.readFileSync(file).toString();
	},
	formatData: function (data) {
		var lines = data.toString().split("\n");
		var lineSplit;
		lines.forEach(function (line) {
			lineSplit = line.split("  ");
			var word = lineSplit[0];
			var phoneme = lineSplit[1];

			if (phoneme.match(/\d/g) !== null) {
				var sylbs = phoneme.match(/\d/g).length;
				if (sylbs < 8) {
					if (!module.exports.library[sylbs]) {
						module.exports.library[sylbs] = [];
						module.exports.library[sylbs].push(word);
					} else {
						module.exports.library[sylbs].push(word);
					}
				}
			}
		});
	},
	// import a book and see sort the words into an object sorted by sylbs. 
	getWordsFromBook: function (data) {
		var wordsFromBook = {};
		// remove "\n", space, and commas
		var booksWords = data.toString().split("\n").join().split(" ").join().split(",");
		// loop over the cmudict library, and see if words from the book can be found inside the library
		// problem is looping the library object takes very long time, so I cannot import a very long text(book) to compare with the library. Want to know if there's a better way to do it.
		for (var sylbs in module.exports.library) {
			module.exports.library[sylbs].forEach(function (guidWord) {
				booksWords.forEach(function (bookWord) {
					if (guidWord.toLowerCase() === bookWord.toLowerCase()) {
						if (!wordsFromBook[sylbs]) {
							wordsFromBook[sylbs] = [];
							wordsFromBook[sylbs].push(bookWord.toUpperCase());
						} else {
							wordsFromBook[sylbs].push(bookWord.toUpperCase());
						}
					}
				});
			});
		}
		return wordsFromBook;
	}
}
