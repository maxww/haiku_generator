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
					finalHaiku.push(sylbsArr[sylbs][randomPosition()]);
				} else {
					finalHaiku.push(module.exports.library[sylbs][randomPosition()]);
				}

			})
		});
		console.log(finalHaiku.join("\n"));
	},
	readCmudictFile: function (file) {
		return fs.readFileSync(file).toString();
	},
	formatData: function (data) {
		var arr = [];
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

	}

}
