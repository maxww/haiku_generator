var fs = require("fs");


module.exports = {
	library: {},
	createHaiku: function (structure) {
		var finalHaiku = [];
		structure.forEach(function (line) {
			line.forEach(function (sylbs) {
				var randomPosition = function () {
					return Math.floor(Math.random() * (module.exports.library[sylbs].length - 1 + 0 + 1) + 0);
				}
				finalHaiku.push(module.exports.library[sylbs][randomPosition()]);
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
