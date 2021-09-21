const validateOrder = require("./validateOrder");
const { goodExampleOrder, altExampleOrder } = require("./orders");

// order tests
test("expect order to be an array", () => {
  expect(validateOrder({})).toStrictEqual([
    "notArrayError",
    "order should be sent as an array",
  ]);
});

test("if an empty order is passed to validateOrder return order size error", () => {
  expect(validateOrder([])).toStrictEqual([
    "orderSizeError1",
    "There are too few cassettes in this order",
  ]);
});

test("if an order contains too many cassettes throw an order size error", () => {
  expect(validateOrder([[], [], [], [], [], []])).toStrictEqual([
    "orderSizeError2",
    "There are too many cassettes in this order",
  ]);
});

test("if an order contains 5 cassettes amd no metaItem throw order size error", () => {
  expect(validateOrder([[], [], [], [], []])).toStrictEqual([
    "orderSizeError2",
    "There are too many cassettes in this order",
  ]);
});

// cassette tests
test("expect any cassettes that are not arrays to throw error", () => {
  expect(validateOrder([2])).toStrictEqual([
    "notArrayError",
    "cassette should be sent as an array",
  ]);
});

test("expect all cassettes to contain the correct denominations", () => {
  expect(validateOrder([["2", 4000]])).toStrictEqual([
    "denominationError",
    "cassettes should only be filled with 5, 10, 20, 50 pound notes",
  ]);
});

test("if the meta item is present expect it to match number of cassettes", () => {
  expect(
    validateOrder([
      ["cassettes", 3],
      ["10", 20000],
      ["50", 10000],
    ])
  ).toStrictEqual([
    "metaItemError",
    "the  meta item does not match the number of cassettes",
  ]);
});

test("expect all cassettes on order to contain 2000 notes", () => {
  expect(
    validateOrder([
      ["10", 20000],
      ["50", 10000],
    ])
  ).toStrictEqual([
    "notesAmountError",
    "cassettes should always be filled with 2000 notes",
  ]);
});

// expected valid examples
test("expect a good order to be validated", () => {
  expect(validateOrder(goodExampleOrder)).toStrictEqual([
    "valid",
    "order valid, send for packing",
  ]);
});

test("expect a good order to be validated", () => {
  expect(validateOrder(altExampleOrder)).toStrictEqual([
    "valid",
    "order valid, send for packing",
  ]);
});
module.exports = goodExampleOrder;
