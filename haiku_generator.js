var haiku = require("./haiku");
var structure = JSON.parse(process.argv[2]);
var textFile = process.argv[3]

haiku.createHaiku(structure, textFile);
