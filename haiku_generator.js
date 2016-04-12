var haiku = require("./haiku");
var cmudictFile = haiku.readCmudictFile("./cmudict.txt");
var theAlchemist = haiku.readCmudictFile("./the_alchemist_copy.txt");
haiku.formatData(cmudictFile);
var wordsFromTheAlchemist = haiku.getWordsFromBook(theAlchemist);
haiku.createHaiku([[2, 2, 1], [3, 4], [2, 2, 1]], wordsFromTheAlchemist);
