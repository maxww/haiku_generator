var haiku = require("./haiku");
var cmudictFile = haiku.readCmudictFile("./cmudict.txt");

haiku.formatData(cmudictFile);
haiku.createHaiku([[2, 2, 1], [7], [5]])
