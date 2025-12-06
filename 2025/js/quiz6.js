const testText = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
function splitEachChar(str) {
  return str.split(" ");
}
function cleanEmptyListString(str) {
  return str.map((s) => s.replace(" ", "")).filter((x) => x != "");
}
function formatToList(text) {
  const operations = text.splice(text.length - 1);
  const numbers = text.filter((x) => x != operations);
  return [
    ...numbers
      .map((x) => cleanEmptyListString(splitEachChar(x)))
      .map((x) => x.map((s) => parseInt(s))),
    cleanEmptyListString(splitEachChar(...operations)),
  ];
}
function seperatePart(texts) {
  const operations = texts.splice(texts.length - 1);
  const numbers = texts.filter((x) => x != operations);
  return [numbers, ...operations];
}

function calculateWithSymbol(symbol, [...values]) {
  const [first, ...rest] = values;
  if (symbol == "-") return rest.reduce((acc, value) => acc - value, first);
  if (symbol == "+") return rest.reduce((acc, value) => acc + value, first);
  if (symbol == "*") return rest.reduce((acc, value) => acc * value, first);
  if (symbol == "/") return rest.reduce((acc, value) => acc / value, first);
}
function splitHeadAndTail(states) {
  return states.reduce((state, order) => {
    const [head, ...rest] = order;
    const [_head, ..._rest] = state;
    if (state.length == 0) {
      return [[head], [rest]];
    }
    return [
      [..._head, head],
      [..._rest.flat(), rest],
    ];
  }, []);
}
function createAStructureForCalculate(ordersNumber) {
  if (ordersNumber.some((x) => x.length == 0)) return 0;
  const [head, tail] = splitHeadAndTail(ordersNumber);
  const [numbers, symbol] = seperatePart(head);
  const summary = calculateWithSymbol(symbol, numbers);
  return summary + createAStructureForCalculate(tail);
}
function splitText(text) {
  return text.split("\n");
}
const fs = require("fs");
const filePath = "../quiz/day_6/input.txt";
const fileContent = fs.readFileSync(filePath, "utf-8");
console.log(splitText(fileContent));
console.log(createAStructureForCalculate(formatToList(splitText(fileContent))));
