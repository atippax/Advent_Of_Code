const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;
function cleanText(text) {
  return text.trim();
}

function splitStrWithChar(str, char) {
  return str
    .trim()
    .split(char)
    .map((x) => cleanText(x));
}

function mapToId(line) {
  const [first, last] = splitStrWithChar(line, "-");
  return { first, last };
}

function isLeadingWithZeroes(text) {
  return !text.startsWith("0");
}

function isDuplicate(index, word) {
  if (index == word.length) return false;
  const head = word.slice(0, index);
  const tail = word.slice(index, word.length);
  if (head == tail) return true;
  const isHaveSamePattern = word.replaceAll(head, "") == "";
  if (isHaveSamePattern) return true;
  return isDuplicate(index + 1, word);
}

function onlyInvalidNumber(num) {
  return isDuplicate(0, num);
}

function getRangeNumber({ first, last }) {
  return Array.from(
    { length: parseInt(last) - parseInt(first) + 1 },
    (_, index) => `${parseInt(first) + parseInt(index)}`
  );
}
function processTextToInvalidIds(text) {
  return splitStrWithChar(text, ",")
    .map(mapToId)
    .map(getRangeNumber)
    .reduce(
      (answer, range) => [
        ...answer,
        ...range.filter(onlyInvalidNumber).filter(isLeadingWithZeroes),
      ],
      []
    );
}
function summarizeInvelidId(arr) {
  return arr.reduce((sum, str) => sum + parseInt(str), 0);
}
const fs = require("fs");
const filePath = "../quiz/day_2/input.txt";
const fileContent = fs.readFileSync(filePath, "utf-8");
console.log(summarizeInvelidId(processTextToInvalidIds(fileContent)));
function a(text) {
  return function b() {
    return text + 1;
  };
}

console.log(a("adad")());
