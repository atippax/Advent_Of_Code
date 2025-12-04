function createADimension(x, y, value = false) {
  return Array.from({ length: y }, () =>
    Array.from({ length: x }, () => value)
  );
}

function toggle(state, target) {
  return state.map((d, x) => {
    return d.map((f, y) => {
      if (x == target[1] && y == target[0]) return !f;
      return f;
    });
  });
}

function thought(from, to, fn) {
  return Array.from({ length: to[1] - from[1] + 1 }, () =>
    Array.from({ length: to[0] - from[0] + 1 }, () => 0)
  ).map((x, indexY) => {
    return x.map((state, indexX) => {
      return {
        x: from[0] + indexX,
        y: from[1] + indexY,
        fn,
      };
    });
  });
}
function turnOff() {
  return false;
}

function turnOn() {
  return true;
}

function isToggle(text) {
  return text.includes("toggle");
}
function isTurnOn(text) {
  return text.includes("turn on");
}
function isTurnOff(text) {
  return text.includes("turn off");
}
function splitWithChar(str, char) {
  return str.split(char);
}
function removeToggle(str) {
  return splitWithChar(str, "toggle")[1];
}
function removeTurnOn(str) {
  return splitWithChar(str, "turn on")[1];
}
function removeTurnOff(str) {
  return splitWithChar(str, "turn off")[1];
}
function parseTextToPosition(str) {
  return str.split(",").map((x) => parseInt(x));
}
function doActionAtTarget(state, target, fn) {
  const newState = state.map((d, x) => {
    return d.map((f, y) => {
      if (x == target[1] && y == target[0]) {
        return fn(f);
      }
      return f;
    });
  });
  return newState;
}
function splitIner(list, x1, x2) {
  return list.map((l) => {
    const head = l.slice(0, x1);
    const body = l.slice(x1, x2 + 1);
    const tail = l.slice(x2 + 1);
    return [head, body, tail];
  });
}
function doAction(target) {
  const newState = target.map((d) => {
    return d.map((f) => {
      return fn(f);
    });
  });
  return newState;
}
function splitTo3Part(list, first, last) {
  const head = list.slice(0, first.y);
  //   const [_h, computed, _l] = splitIner(body, first.x, last.x);
  const body = list.slice(first.y, last.y + 1);
  const tail = list.slice(last.y + 1);
  return [head, splitIner(body, first.x, last.x), tail];
}
function action(state, actionList) {
  const first = actionList[0][0];
  const last =
    actionList[actionList.length - 1][
      actionList[actionList.length - 1].length - 1
    ];
  const [head, [_h, targets, _t], tail] = splitTo3Part(state, first, last);
  return [head, [_h, actionList.reduce((x) => doAction(y.fn), []), _t], tail];
  return actionList.reduce((stateOne, x) => {
    return x.reduce((_state, y) => {
      return doActionAtTarget(_state, [y.x, y.y], y.fn);
    }, stateOne);
  }, state);
}
function actionWithTextCommand(state, str) {
  if (isToggle(str)) {
    const toggleStatement = removeToggle(str);
    const [from, to] = getThoughtRange(toggleStatement);
    const wantToActions = thought.bind(
      null,
      parseTextToPosition(from),
      parseTextToPosition(to)
    );
    const actionToggle = (e) => !e;
    return action(state, wantToActions(actionToggle));
  }
  if (isTurnOff(str)) {
    const toggleStatement = removeTurnOff(str);
    const [from, to] = getThoughtRange(toggleStatement);
    const wantToActions = thought.bind(
      null,
      parseTextToPosition(from),
      parseTextToPosition(to)
    );
    const actionToggle = (e) => false;
    return action(state, wantToActions(actionToggle));
  }
  if (isTurnOn(str)) {
    const toggleStatement = removeTurnOn(str);
    const [from, to] = getThoughtRange(toggleStatement);
    const wantToActions = thought.bind(
      null,
      parseTextToPosition(from),
      parseTextToPosition(to)
    );
    const actionToggle = (e) => true;
    return action(state, wantToActions(actionToggle));
  }
  return state;
}
function getThoughtRange(str) {
  const [from, to] = splitWithChar(str, "through");
  return [from, to];
}
// console.log(getThoughtRange(removeToggle(text)));
const state = createADimension(1000, 1000);
// const text = "toggle 461,550 through 564,900";
console.log(
  actionWithTextCommand(
    actionWithTextCommand(
      actionWithTextCommand(state, "turn on 0,0 through 999,999"),
      "toggle 0,0 through 999,0"
    ),
    "turn off 499,499 through 500,500"
  ).reduce((sumx, x) => {
    return x.reduce((sumy, y) => {
      if (y) return 1 + sumy;
      return sumy;
    }, sumx);
  }, 0)
);
// console.table(thought([1, 2], [2, 5], 0));
