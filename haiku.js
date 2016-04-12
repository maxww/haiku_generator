var fs = require("fs");


module.exports = {
	library: {},
	createHaiku: function (structure) {
		var finalHaiku = [];
		for (var i = 0; i < structure.length; i++) {
			for (var j = 0; j < structure[i].length; j++) {
				var randomPosition = function () {
					return Math.floor(Math.random() * (module.exports.library[structure[i][j]].length - 1 + 0 + 1) + 0);
				}
				finalHaiku.push(module.exports.library[structure[i][j]][randomPosition()]);
			}
		}
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
