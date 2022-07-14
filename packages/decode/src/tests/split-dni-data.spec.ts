import splitDNIData from "../dni-decoder/split-dni-data";

describe("splitDNIData", () => {
  test("should return an array with 2 elements", () => {
    const data = "item_1@item_2";
    const result = splitDNIData(data);

    expect(result).toHaveLength(2);
  });
});
