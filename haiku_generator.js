var haiku = require("./haiku");
var cmudictFile = haiku.readCmudictFile("./cmudict.txt");
var theAlchemist = haiku.readCmudictFile("./the_alchemist_copy.txt");
// if I want to use cmudict.txt to create the poem
var library = haiku.formatData(cmudictFile);
// haiku.createHaiku([[2, 2, 1], [3, 4], [2, 2, 1]], library);
// to compare the book with cmudict.txt (so I can sort the sylbs)
haiku.generateLibrary(cmudictFile);

var wordsFromTheAlchemist = haiku.getWordsFromBook(theAlchemist);
haiku.createHaiku([[2, 2, 1], [3, 2, 2], [2, 2, 1]], wordsFromTheAlchemist);
