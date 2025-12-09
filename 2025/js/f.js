const g = [
  [{ findIndex: 7, splits: [6, 8] }],
  [
    { findIndex: 6, splits: [5, 7] },
    { findIndex: 8, splits: [7, 9] },
  ],
  [
    { findIndex: 5, splits: [4, 6] },
    { findIndex: 7, splits: [6, 8] },
    { findIndex: 9, splits: [8, 10] },
  ],
  [
    { findIndex: 4, splits: [3, 5] },
    { findIndex: 6, splits: [5, 7] },
    { findIndex: 8, splits: [8] },
    { findIndex: 10, splits: [9, 11] },
  ],
  [
    { findIndex: 3, splits: [2, 4] },
    { findIndex: 5, splits: [4, 6] },
    { findIndex: 8, splits: [8] },
    { findIndex: 7, splits: [7] },

    { findIndex: 9, splits: [8, 10] },
    { findIndex: 11, splits: [10, 12] },
  ],
  [
    { findIndex: 2, splits: [1, 3] },
    { findIndex: 8, splits: [8] },
    { findIndex: 7, splits: [7] },
    { findIndex: 6, splits: [5, 7] },
    { findIndex: 12, splits: [11, 13] },
  ],
  [
    { findIndex: 1, splits: [0, 2] },
    { findIndex: 3, splits: [2, 4] },
    { findIndex: 5, splits: [4, 6] },
    { findIndex: 8, splits: [8] },
    { findIndex: 7, splits: [6, 8] },
    { findIndex: 9, splits: [8, 10] },
    { findIndex: 13, splits: [12, 14] },
  ],
];
console.log("sdasd");
console.log(j(g));
function j(logs, y = 0) {
  const [head, ...rest] = logs;
  if (rest.length == 0) {
    return head.reduce((c, i) => {
      return {
        ...c,
        ...{ [`${i.findIndex},${y}`]: i.splits.reduce((c, h) => c + 1, 0) },
      };
    }, {});
  }
  const makeCaches = j(rest, y + 1);
  const currentCache = head.reduce((c, item) => {
    const newCache = {
      [`${item.findIndex},${y}`]: item.splits.reduce((s, p) => {
        return s + (c[`${p},${y + 1}`] ?? 1);
      }, 0),
      ...item.splits.reduce((t, o) => {
        return { ...t, [`${o},${y + 1}`]: c[`${o},${y + 1}`] ?? 1 };
      }, {}),
    };
    return {
      ...c,
      ...newCache,
    };
  }, makeCaches);
  return {
    ...makeCaches,
    ...currentCache,
  };
}
