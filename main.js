const mainForm = document.getElementById("main-form");
const text = document.getElementsByName("text")[0];
const resultTable = document.getElementById("result-table");
const tableBody = resultTable.getElementsByTagName("tbody")[0];

function removeHtmlTags(value) {
  const div = document.createElement("div");
  div.innerHTML = value;
  return div.textContent;
}

function insertToTable(val) {
  const [word, frequency] = val;
  const newRow = tableBody.insertRow();

  const wordCell = newRow.insertCell(0);
  wordCell.innerText = word;

  const frequencyCell = newRow.insertCell(1);
  frequencyCell.innerText = frequency;
}

mainForm.addEventListener("submit", e => {
  e.preventDefault();

  // Remove html tags that contains on the value
  const value = removeHtmlTags(text.value);

  // Remove newline and change it to space
  const noNewlineValue = value.split("\n").join(" ");

  // Remove symbol
  const noSymbolValue = noNewlineValue.replace(/[^a-zA-Z ]/g, "");

  // Split all word to array
  // This steps also called tokenization
  const tokenValue = noSymbolValue.split(" ");

  // Remove any number value
  const arrValue = tokenValue.filter(val => isNaN(val));

  // TODO: Handle phrase

  // Stop words source: https://www.ranks.nl/stopwords
  const stopWords =
    "a,about,above,after,again,against,all,am,an,and,any,are,aren't,as,at,be,because,been,before,being,below,between,both,but,by,can't,cannot,could,couldn't,did,didn't,do,does,doesn't,doing,don't,down,during,each,few,for,from,further,had,hadn't,has,hasn't,have,haven't,having,he,he'd,he'll,he's,her,here,here's,hers,herself,him,himself,his,how,how's,i,i'd,i'll,i'm,i've,if,in,into,is,isn't,it,it's,its,itself,let's,me,more,most,mustn't,my,myself,no,nor,not,of,off,on,once,only,or,other,ought,our,ours,ourselves,out,over,own,same,shan't,she,she'd,she'll,she's,should,shouldn't,so,some,such,than,that,that's,the,their,theirs,them,themselves,then,there,there's,these,they,they'd,they'll,they're,they've,this,those,through,to,too,under,until,up,very,was,wasn't,we,we'd,we'll,we're,we've,were,weren't,what,what's,when,when's,where,where's,which,while,who,who's,whom,why,why's,with,won't,would,wouldn't,you,you'd,you'll,you're,you've,your,yours,yourself,yourselves";
  const arrStopWords = stopWords.split(",");

  // Remove stop words from value
  const valueWithNoStopWords = _.pullAll(arrValue, arrStopWords);

  // Stem all values
  const stemValues = valueWithNoStopWords.map(val => stemmer(val));

  const wordFrequency = _.countBy(stemValues);
  const wordFrequencyEntries = Object.entries(wordFrequency);

  wordFrequencyEntries.forEach(val => insertToTable(val));
});
