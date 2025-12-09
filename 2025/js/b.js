const testText = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`;
function lineSpliter(text) {
  return text.split("\n").filter((x) => x.trim() != "");
}
function findStartIndex(text) {
  if (text.length == 0) return null;
  const [char, ...rest] = text;
  if (char == "S") return 0;
  return 1 + findStartIndex(rest.join(""));
}
function headAndBody(lines) {
  const [head, ...body] = lines;
  return [head, body];
}

function isBeamSpliter(char) {
  return char == "^";
}
function readCharAtIndex(text, index) {
  return text.slice(index, index + 1);
}

function splitingBeam(x, y, lines, caches = {}) {
  const key = `${x},${y}`;
  if (caches[key] != undefined) return caches;
  if (lines.length == 0) return caches;
  const [head, rest] = headAndBody(lines);
  const char = readCharAtIndex(head, x);
  if (rest.length == 0) {
    return {
      ...caches,
      [`${x},${y}`]: 1,
    };
  }
  if (isBeamSpliter(char)) {
    const rightKey = `${x + 1},${y + 1}`;
    const leftKey = `${x - 1},${y + 1}`;
    const left = splitingBeam(x - 1, y + 1, rest, caches);
    const right = splitingBeam(x + 1, y + 1, rest, left);
    return {
      ...caches,
      ...left,
      ...right,
      [key]: right[leftKey] + right[rightKey],
    };
  }
  const childCaches = splitingBeam(x, y + 1, rest, caches);
  return { ...childCaches, [key]: childCaches[`${x},${y + 1}`] };
}
const fs = require("fs");
const filePath = "../quiz/day_7/input.txt";
const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = lineSpliter(fileContent);
const [head, body] = headAndBody(lines);
const indexStarter = findStartIndex(head);
const caches = splitingBeam(indexStarter, 0, body);
console.log(Object.keys(caches).length);
const caches2 = splitingBeam(indexStarter, 0, body);
console.log(Object.keys(caches2).length);
