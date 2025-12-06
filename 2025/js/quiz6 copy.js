const testText = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
function splitEachChar(str) {
  return str.split(/(?<=\S) /g);
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
      .map((x) => x.map((s) => s)),
    cleanEmptyListString(splitEachChar(...operations)),
  ];
}
function seperatePart(texts) {
  const operations = texts.splice(texts.length - 1);
  const numbers = texts.filter((x) => x != operations);
  return [numbers, ...operations];
}
function cephalopodsNumber(stringNumbers) {
  if (stringNumbers.every((e) => e.length == 0)) return [];
  const [head, rest] = splitHeadAndTail(stringNumbers);
  const number = parseInt(
    head.reduce((num, digit) => num + (digit == 0 ? "" : digit), "")
  );
  return [number, ...cephalopodsNumber(rest)];
}

function calculateWithSymbol(symbol, [...values]) {
  const maxNumber = Math.max(...values);
  const mapToStr = values
    .map((x) => x.toString().padStart(maxNumber.toString().length, "0"))
    .map((f) => f.split(""));
  const [first, ...rest] = cephalopodsNumber(mapToStr);
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
// console.log(formatToList(splitText(testText)));
// console.log(createAStructureForCalculate(formatToList(splitText(testText))));

const [numbers, operations] = seperatePart(splitText(fileContent));
const filZero = operations
  .match(/(\S+)\s*/g)
  .map((x) => x.replaceAll(" ", "0"));
const restHead = filZero
  .slice(0, filZero.length - 1)
  .map((x) => x.replace("0", ""));
const last = filZero.splice(filZero.length - 1);
const allSymbol = [...restHead, ...last];
const indexToSplit = allSymbol.map((x) => x.length);

const splitEachNumber = indexToSplit.reduce(
  ({ arr, prevLength }, indexToStoreNumber, index) => {
    const from = prevLength;
    const to = from + indexToStoreNumber;

    return {
      arr: [
        ...arr,
        numbers.map((str) => {
          const stringToTrim = str.slice(from, to);
          return stringToTrim;
        }),
      ],
      prevLength: prevLength + indexToStoreNumber + 1,
    };
  },
  { arr: [], prevLength: 0 }
);
console.log(splitEachNumber.arr);
const numberReadyToUse = splitEachNumber.arr.map((x) =>
  x.map((f) => f.replaceAll(" ", "0"))
);
const mergeSymbol = [
  ...numberReadyToUse,
  cleanEmptyListString(operations.split(" ")),
];
// console.log(indexToSplit);

console.log(calPart2(mergeSymbol));
function calPart2(mergeSymbol) {
  if (mergeSymbol.some((x) => x.length == 0)) return 0;
  const [states, operations] = seperatePart(mergeSymbol);
  const [operation, ...restOperations] = operations;
  const [state, ...restState] = states;
  const sum = calculateWithSymbol(operation, state);
  const merge = [...restState, restOperations];
  return sum + calPart2(merge);
}
